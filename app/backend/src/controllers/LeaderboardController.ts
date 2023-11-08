import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getTable();
    res.status(status).json(data);
  }
}
