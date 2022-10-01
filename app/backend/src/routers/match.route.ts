import { Router } from 'express';
import { MatchController } from '../controllers';
import validToken from '../middlewares/validate.token';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.getAll(req, res));

matchRouter.post('/', validToken, (req, res) => matchController.create(req, res));
export default matchRouter;
