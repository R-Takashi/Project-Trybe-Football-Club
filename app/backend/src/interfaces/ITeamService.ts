import IResponseService from './IResponseService';

export default interface ITeam {
  getAll(): Promise<IResponseService>;
}
