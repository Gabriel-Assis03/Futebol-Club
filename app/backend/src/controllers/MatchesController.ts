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
    } else if (typeof inProgress === 'string') {
      const { status, data } = await this.matchesService.getFilter(inProgress);
      res.status(status).json(data);
    }
  }

  public async editStatusMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.editStatusMatches(id);
    res.status(status).json(data);
  }

  public async editScoreMatches(req: Request, res: Response) {
    console.log(req);
    const { id } = req.params;
    const { status, data } = await this.matchesService.editScoreMatches(id, req.body);
    res.status(status).json(data);
  }

  public async creatMatches(req: Request, res: Response) {
    const { status, data } = await this.matchesService.creatMatches(req.body);
    res.status(status).json(data);
  }
}
