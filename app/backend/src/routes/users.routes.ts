import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Ver from '../auth/validateJWT';

const usersController = new UsersController();
// const validateToken = new ValidateToken();

const router = Router();

router.post('/', (req: Request, res: Response) => usersController.postLogin(req, res));

router.get(
  '/role',
  Ver,
  (req: Request, res: Response) => usersController.getRole(req, res),
);

export default router;
