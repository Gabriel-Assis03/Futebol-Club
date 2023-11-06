import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, data } = await this.matchesService.getAll();
      res.status(status).json(data);
    } else {
      const { status, data } = await this.matchesService.getFilter(inProgress);
      res.status(status).json(data);
    }
  }
}
