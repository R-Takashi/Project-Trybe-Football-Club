import { Request, Response } from 'express';

import { MatchService } from '../services';

export default class MatchController {
  private _matchService = new MatchService();

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query as { inProgress: string };

    if (inProgress) {
      const filter = JSON.parse(inProgress); // convertendo string para boolean https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
      const { status, response } = await this._matchService.getByProgress(filter);
      return res.status(status).json(response);
    }

    const { status, response } = await this._matchService.getAll();

    return res.status(status).json(response);
  }
}
