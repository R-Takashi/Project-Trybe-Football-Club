import { Request, Response } from 'express';

import TeamService from '../services/team.service';

export default class TeamController {
  private _teamService = new TeamService();

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { status, response } = await this._teamService.getAll();

    return res.status(status).json(response);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { status, response } = await this._teamService.getById(id);

    return res.status(status).json(response);
  }
}
