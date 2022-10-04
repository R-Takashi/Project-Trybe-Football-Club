import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));

export default leaderboardRouter;
