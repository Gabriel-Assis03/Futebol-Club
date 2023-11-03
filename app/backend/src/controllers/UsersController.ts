import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  public async postLogin(req: Request, res: Response) {
    const { status, data } = await this.usersService.login(req.body);
    res.status(status).json(data);
  }
}
