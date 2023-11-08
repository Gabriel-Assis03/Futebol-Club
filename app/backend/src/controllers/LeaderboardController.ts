import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getTableHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getTableHome();
    res.status(status).json(data);
  }

  public async getTableAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getTableAway();
    res.status(status).json(data);
  }

  public async getTableAll(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getTableAll();
    res.status(status).json(data);
  }
}
