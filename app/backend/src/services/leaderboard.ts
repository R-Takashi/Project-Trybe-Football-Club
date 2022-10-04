import { IResponseService, IScoreboard, ITeam } from '../interfaces';

export default abstract class LeaderboardService {
  public abstract getLeaderboard(): Promise<IResponseService>;

  public abstract getTeams(): Promise<ITeam[]>;

  public abstract getWins(id: number): Promise<number>;

  public abstract getDraws(id: number): Promise<number>;

  public abstract getLosses(id: number): Promise<number>;

  public abstract getGoalsFavor(id: number): Promise<number>;

  public abstract getGoalsOwn(id: number): Promise<number>;

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

  public abstract getTotalGames(id: number): Promise<number>;

  public async getEfficiency(id: number): Promise<number> {
    const totalPoints = await this.getTotalPoints(id);
    const totalGames = await this.getTotalGames(id);

    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return +efficiency.toFixed(2);
  }

  public orderScoreboard = (scoreboard: IScoreboard[]): IScoreboard[] => {
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
}
