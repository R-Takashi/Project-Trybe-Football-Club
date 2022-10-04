import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  private _leaderboardService = new LeaderboardService();

  public async getHomeLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, response } = await this._leaderboardService.getHomeLeaderboard();

    return res.status(status).json(response);
  }
}
