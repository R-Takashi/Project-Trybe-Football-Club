import { Op } from 'sequelize';
import sequelize = require('sequelize');
import Match from '../database/models/matches.model';
import Team from '../database/models/teams.model';
import { IResponseService, IScoreboard } from '../interfaces';

const orderScoreboard = (scoreboard: IScoreboard[]): IScoreboard[] => {
  const sortedScoreboard = scoreboard.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn < b.goalsOwn) return -1;
    if (a.goalsOwn > b.goalsOwn) return 1;
    return 0;
  });

  return sortedScoreboard;
};

export default class LeaderboardService {
  public matchModel = Match;
  public teamModel = Team;

  public async getHomeLeaderboard(): Promise<IResponseService> {
    const teamsHome = await this.getTeamsHome() as unknown as Team[];

    const scoreboard = await Promise.all(teamsHome.map(async ({ id, teamName }) => ({
      name: teamName,
      totalPoints: await this.getTotalPoints(id),
      totalGames: await this.getTotalGames(id),
      totalVictories: await this.getWins(id),
      totalDraws: await this.getDraws(id),
      totalLosses: await this.getLosses(id),
      goalsFavor: await this.getGoalsFavor(id),
      goalsOwn: await this.getGoalsOwn(id),
      goalsBalance: await this.getGoalsBalance(id),
      efficiency: await this.getEfficiency(id),
    })));

    const sortedScoreboard = orderScoreboard(scoreboard);

    return { status: 200, response: sortedScoreboard };
  }

  public async getTeamsHome(): Promise<unknown> {
    const teamsHome = await this.teamModel.findAll({
      where: {
        id: {
          [Op.in]: sequelize.literal(`(
            SELECT home_team 
            FROM TRYBE_FUTEBOL_CLUBE.matches
            INNER JOIN TRYBE_FUTEBOL_CLUBE.teams
            ON home_team = teams.id
            WHERE home_team = teams.id
          )`),
        },
      },
    });

    return teamsHome;
  }

  public async getWins(id: number): Promise<number> {
    const countWins = await this.matchModel.findAll({
      where: {
        [Op.and]: [
          { homeTeam: id, inProgress: false },
          sequelize.where(sequelize.col('home_team_goals'), '>', sequelize.col('away_team_goals')),
        ],
      },
    });

    return countWins.length;
  }

  public async getDraws(id: number): Promise<number> {
    const countDraws = await this.matchModel.count({
      where: {
        [Op.and]: [
          { homeTeam: id },
          sequelize.where(sequelize.col('home_team_goals'), sequelize.col('away_team_goals')),
          { inProgress: false },
        ],
      },
    });

    return countDraws;
  }

  public async getLosses(id: number): Promise<number> {
    const countLosses = await this.matchModel.findAll({
      where: {
        [Op.and]: [
          { homeTeam: id, inProgress: false },
          sequelize.where(sequelize.col('home_team_goals'), '<', sequelize.col('away_team_goals')),
        ],
      },
    });

    return countLosses.length;
  }

  public async getGoalsFavor(id: number): Promise<number> {
    const goalsFavor = await this.matchModel.sum('homeTeamGoals', {
      where: { homeTeam: id, inProgress: false },
    });

    return goalsFavor;
  }

  public async getGoalsOwn(id: number): Promise<number> {
    const goalsOwn = await this.matchModel.sum('awayTeamGoals', {
      where: { homeTeam: id, inProgress: false },
    });

    return goalsOwn;
  }

  public async getGoalsBalance(id: number): Promise<number> {
    const goalsFavor = await this.getGoalsFavor(id);
    const goalsOwn = await this.getGoalsOwn(id);

    const goalsBalance = goalsFavor - goalsOwn;

    return goalsBalance;
  }

  public async getTotalPoints(id: number): Promise<number> {
    const winPoints = await this.getWins(id);
    const drawPoints = await this.getDraws(id);

    const totalPoints = (winPoints * 3) + drawPoints;

    return totalPoints;
  }

  public async getTotalGames(id: number): Promise<number> {
    const totalGames = await this.matchModel.count({
      where: { homeTeam: id, inProgress: false },
    });

    return totalGames;
  }

  public async getEfficiency(id: number): Promise<number> {
    const totalPoints = await this.getTotalPoints(id);
    const totalGames = await this.getTotalGames(id);

    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return +efficiency.toFixed(2);
  }
}
