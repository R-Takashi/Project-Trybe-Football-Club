import LeaderboardHomeService from './leaderboard.home.services';
import LeaderboardAwayService from './leaderboard.away.service';
import { IResponseService, IScoreboard } from '../interfaces';

export default class LeaderboardGeneralService {
  public leaderboardHome = new LeaderboardHomeService();
  public leaderboardAway = new LeaderboardAwayService();

  public async getLeaderboard(): Promise<IResponseService> {
    const scoreHome = await this.getScoreHome() as IScoreboard[];
    const scoreAway = await this.getScoreAway() as IScoreboard[];

    const scoreboard = LeaderboardGeneralService.mergeScore(scoreHome, scoreAway);

    const scoreboardOrdered = this.leaderboardHome.orderScoreboard(scoreboard);

    return { status: 200, response: scoreboardOrdered };
  }

  public async getScoreHome(): Promise<unknown> {
    const { response } = await this.leaderboardHome.getLeaderboard();

    return response;
  }

  public async getScoreAway(): Promise<unknown> {
    const { response } = await this.leaderboardAway.getLeaderboard();

    return response;
  }

  public static mergeScore(scoreHome: IScoreboard[], scoreAway:IScoreboard[]): IScoreboard[] {
    return scoreHome.map((home: IScoreboard) => {
      const away = scoreAway.find((team: IScoreboard) => team.name === home.name) as IScoreboard;
      return {
        name: home.name,
        totalPoints: home.totalPoints + away.totalPoints,
        totalGames: home.totalGames + away.totalGames,
        totalVictories: home.totalVictories + away.totalVictories,
        totalDraws: home.totalDraws + away.totalDraws,
        totalLosses: home.totalLosses + away.totalLosses,
        goalsFavor: home.goalsFavor + away.goalsFavor,
        goalsOwn: home.goalsOwn + away.goalsOwn,
        goalsBalance: home.goalsBalance + away.goalsBalance,
        efficiency: LeaderboardGeneralService.calcEfficiency(
          (home.totalPoints + away.totalPoints),
          (home.totalGames + away.totalGames),
        ),
      };
    });
  }

  public static calcEfficiency(totalPoints: number, totalGames: number): number {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return +efficiency.toFixed(2);
  }
}
