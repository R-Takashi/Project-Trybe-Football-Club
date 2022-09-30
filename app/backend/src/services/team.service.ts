import HttpException from '../shared/http.exception';
import { ITeamService, IResponseService } from '../interfaces';
import Team from '../database/models/teams.model';

export default class TeamService implements ITeamService {
  public teamModel = Team;

  public getAll = async (): Promise<IResponseService> => {
    const teams = await this.teamModel.findAll();

    return { status: 200, response: teams } as IResponseService;
  };

  public getById = async (id: string): Promise<IResponseService> => {
    const team = await this.teamModel.findOne({ where: { id } });

    if (!team) {
      throw new HttpException(404, 'Team not found');
    }

    return { status: 200, response: team } as IResponseService;
  };
}
