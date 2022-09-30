import { Router } from 'express';
import { MatchController } from '../controllers';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.getAll(req, res));

export default matchRouter;
