import { IMatchService, IResponseService } from '../interfaces';
import Match from '../database/models/matches.model';
import Team from '../database/models/teams.model';

export default class MatchService implements IMatchService {
  public matchModel = Match;

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
