// src/services/BookService.ts

// import { NewEntity } from '../interfaces';
import TeamsModel from '../database/models/TeamsModel';
import teams from '../Interfaces/interTeams';
// import { IBookModel } from '../interfaces/books/IBookModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  private model = TeamsModel;
  // constructor(
  //   private bookModel: IBookModel = new Teams(),
  // ) { }

  public async getAllTeams(): Promise<ServiceResponse<teams[]>> {
    const allTeams = await this.model.findAll();
    return { status: 200, data: allTeams };
  }

  public async getTeamById(id: string): Promise<ServiceResponse<teams>> {
    const team = await this.model.findByPk(id);
    if (!team) return { status: 404, data: { message: `Team ${id} not found` } };
    return { status: 200, data: team };
  }
}
