import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import VerifyToken from '../auth/validateJWT';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getMatchesHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getMatchesAway(req, res),
);

export default router;
