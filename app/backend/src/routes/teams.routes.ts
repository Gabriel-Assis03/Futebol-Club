// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';
// import Validations from '../middlewares/Validations';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

export default router;
