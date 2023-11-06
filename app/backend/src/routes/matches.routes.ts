import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
// import VerifyToken from '../auth/validateJWT';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

export default router;