import { Request, Response } from 'express';

import { MatchService } from '../services';

export default class MatchController {
  private _matchService = new MatchService();

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { status, response } = await this._matchService.getAll();

    return res.status(status).json(response);
  }
}
