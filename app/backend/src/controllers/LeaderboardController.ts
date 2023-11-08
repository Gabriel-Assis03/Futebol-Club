import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getMatchesHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getTableHome();
    res.status(status).json(data);
  }

  public async getMatchesAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getTableAway();
    res.status(status).json(data);
  }
}
