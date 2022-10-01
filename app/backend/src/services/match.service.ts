import { IMatchService, IResponseService } from '../interfaces';
import Match from '../database/models/matches.model';
import Team from '../database/models/teams.model';

export default class MatchService implements IMatchService {
  public matchModel = Match;

  public async getByProgress(inProgress: boolean): Promise<IResponseService> {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return { status: 200, response: matches };
  }

  public getAll = async (): Promise<IResponseService> => {
    const matches = await this.matchModel.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return { status: 200, response: matches } as IResponseService;
  };
}
