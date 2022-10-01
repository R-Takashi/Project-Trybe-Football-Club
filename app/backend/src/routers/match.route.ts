import { Router } from 'express';
import { MatchController } from '../controllers';
import validToken from '../middlewares/validate.token';
import validMatch from '../middlewares/validate.match';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.getAll(req, res));

matchRouter.post('/', validToken, validMatch, (req, res) => matchController.create(req, res));

matchRouter.patch('/:id/finish', validToken, (req, res) => matchController.update(req, res));

export default matchRouter;
