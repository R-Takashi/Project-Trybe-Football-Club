import { ITeamService, IResponseService } from '../interfaces';
import Team from '../database/models/teams.model';

export default class TeamService implements ITeamService {
  public teamModel = Team;

  public getAll = async (): Promise<IResponseService> => {
    const teams = await this.teamModel.findAll();

    return { status: 200, response: teams } as IResponseService;
  };
}
