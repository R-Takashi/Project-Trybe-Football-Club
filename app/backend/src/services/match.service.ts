import HttpException from '../shared/http.exception';
import { IMatchService, INewMatch, IResponseService } from '../interfaces';
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

  public create = async (newMatch: INewMatch): Promise<IResponseService> => {
    const match = await this.matchModel.create(newMatch);

    return { status: 201, response: match } as IResponseService;
  };

  public update = async (id: string): Promise<IResponseService> => {
    const match = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    if (!match) {
      throw new HttpException(404, 'Match not found');
    }

    return { status: 200, response: 'Finished' } as IResponseService;
  };

  public updateScore = async (
    id: string,
    scoreboard: { homeTeam: number; awayTeam: number },
  ): Promise<IResponseService> => {
    const match = await this.matchModel.update(
      { ...scoreboard },
      { where: { id, inProgress: true } },
    );

    if (!match) {
      throw new HttpException(404, 'Match not found');
    }

    return { status: 200, response: 'Scoreboard updated' } as IResponseService;
  };
}
