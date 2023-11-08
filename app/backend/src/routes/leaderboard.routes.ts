import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import VerifyToken from '../auth/validateJWT';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getTableAll(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getTableHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getTableAway(req, res),
);

export default router;
