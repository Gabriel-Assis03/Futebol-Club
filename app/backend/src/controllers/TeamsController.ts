// src/controllers/BookController.ts

import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();
    res.status(status).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getTeamById(id);
    res.status(status).json(data);
  }
}
