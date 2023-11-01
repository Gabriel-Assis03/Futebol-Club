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
    const newBook = await this.model.findAll();
    return { status: 'SUCCESSFUL', data: newBook };
  }
}
