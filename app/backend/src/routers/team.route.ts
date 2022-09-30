import { Router } from 'express';
import { TeamController } from '../controllers';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/', (req, res) => teamController.getAll(req, res));

export default teamRouter;
