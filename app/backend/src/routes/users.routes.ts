import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.post('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

export default router;
