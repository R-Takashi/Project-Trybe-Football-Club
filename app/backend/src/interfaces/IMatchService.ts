import IResponseService from './IResponseService';

export default interface IMatchService {
  getAll: () => Promise<IResponseService>;
}
