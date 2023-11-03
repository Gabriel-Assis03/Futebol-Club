import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const router = Router();

router.post('/', (req: Request, res: Response) => usersController.postLogin(req, res));

export default router;
