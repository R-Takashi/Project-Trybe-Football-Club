import { Op } from 'sequelize';
import sequelize = require('sequelize');
import Match from '../database/models/matches.model';
import Team from '../database/models/teams.model';
import { IResponseService, ITeam } from '../interfaces';
import LeaderboardService from './leaderboard';

export default class LeaderboardAwayService extends LeaderboardService {
  public matchModel = Match;
  public teamModel = Team;

  public async getLeaderboard(): Promise<IResponseService> {
    const teamsAway = await this.getTeams();

    const scoreboard = await Promise.all(teamsAway.map(async ({ id, teamName }) => ({
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

    return { status: 200, response: this.orderScoreboard(scoreboard) };
  }

  public async getTeams(): Promise<ITeam[]> {
    const teamsAway = await this.teamModel.findAll({
      where: {
        id: {
          [Op.in]: sequelize.literal(`(
            SELECT away_team 
            FROM TRYBE_FUTEBOL_CLUBE.matches
            INNER JOIN TRYBE_FUTEBOL_CLUBE.teams
            ON away_team = teams.id
            WHERE away_team = teams.id
          )`),
        },
      },
    });

    return teamsAway;
  }

  public async getWins(id: number): Promise<number> {
    const countWins = await this.matchModel.findAll({
      where: {
        [Op.and]: [
          { awayTeam: id, inProgress: false },
          sequelize.where(sequelize.col('away_team_goals'), '>', sequelize.col('home_team_goals')),
        ],
      },
    });

    return countWins.length;
  }

  public async getDraws(id: number): Promise<number> {
    const countDraws = await this.matchModel.findAll({
      where: {
        [Op.and]: [
          { awayTeam: id, inProgress: false },
          sequelize.where(sequelize.col('away_team_goals'), '=', sequelize.col('home_team_goals')),
        ],
      },
    });

    return countDraws.length;
  }

  public async getLosses(id: number): Promise<number> {
    const countLosses = await this.matchModel.findAll({
      where: {
        [Op.and]: [
          { awayTeam: id, inProgress: false },
          sequelize.where(sequelize.col('away_team_goals'), '<', sequelize.col('home_team_goals')),
        ],
      },
    });

    return countLosses.length;
  }

  public async getGoalsFavor(id: number): Promise<number> {
    const goalsFavor = await this.matchModel.sum('awayTeamGoals', {
      where: { awayTeam: id, inProgress: false },
    });

    return goalsFavor;
  }

  public async getGoalsOwn(id: number): Promise<number> {
    const goalsOwn = await this.matchModel.sum('homeTeamGoals', {
      where: { awayTeam: id, inProgress: false },
    });

    return goalsOwn;
  }

  public async getTotalGames(id: number): Promise<number> {
    const totalGames = await this.matchModel.count({
      where: { awayTeam: id, inProgress: false },
    });

    return totalGames;
  }
}
