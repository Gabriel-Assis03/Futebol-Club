import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import VerifyToken from '../auth/validateJWT';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllMatches(req, res),
);

export default router;
