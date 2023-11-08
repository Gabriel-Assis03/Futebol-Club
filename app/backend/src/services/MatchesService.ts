// import bcrypt = require('bcryptjs');
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
// import jwt from '../middlewares/jwt.util';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import matches from '../Interfaces/interMatches';
import validate from './validations/validations';

type BodyEdit = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

// type matchesTest = {
//   homeTeamId: number,
//   homeTeamGoals: number,
//   awayTeamId: number,
//   awayTeamGoals: number,
//   inProgress: boolean,
// };

type BodyCreat = {
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeTeamId: number,
  awayTeamId: number,
};

type format = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string,
  },
  awayTeam: { teamName: string },
};

type format2 = {
  id?: number | undefined,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export default class UsersService {
  private matchesModel = MatchesModel;
  private teamsModel = TeamsModel;

  private format2(element: format2): object {
    this.teamsModel.findAll();
    return {
      id: element.id,
      homeTeamId: element.homeTeamId,
      homeTeamGoals: element.homeTeamGoals,
      awayTeamId: element.awayTeamId,
      awayTeamGoals: element.awayTeamGoals,
      inProgress: element.inProgress,
    };
  }

  private async format(allMatches: format2[]): Promise<format[] | unknown> {
    const ret = await Promise.all(
      allMatches.map(async (e: matches): Promise<object | void | unknown> => {
        const homeTeam = await this.teamsModel.findByPk(e.homeTeamId);
        const awayTeam = await this.teamsModel.findByPk(e.awayTeamId);
        const formatRet = this.format2(e);
        if (homeTeam && awayTeam) {
          return {
            ...formatRet,
            homeTeam: {
              teamName: homeTeam.dataValues.teamName,
            },
            awayTeam: { teamName: awayTeam.dataValues.teamName },
          };
        }
      }),
    );
    return ret;
  }

  public async getAll(): Promise<ServiceResponse<format[] | unknown>> {
    const allMatches = await this.matchesModel.findAll();
    const ret = await this.format(allMatches);
    return { status: 200, data: ret };
  }

  public async getFilter(filter: string): Promise<ServiceResponse<format[] | unknown>> {
    const filterMatches = await this.matchesModel.findAll({
      where: {
        inProgress: JSON.parse(filter),
      },
    });
    const ret = await this.format(filterMatches);
    return { status: 200, data: ret };
  }

  public async editStatusMatches(id: string): Promise<ServiceResponse<format[] | unknown>> {
    await this.matchesModel.update({ inProgress: false }, {
      where: { id },
    });
    return { status: 200, data: { message: 'Finished' } };
  }

  public async editScoreMatches(id: string, body: BodyEdit)
    : Promise<ServiceResponse<format[] | unknown>> {
    const { awayTeamGoals, homeTeamGoals } = body;
    await this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return { status: 200, data: { message: 'Finished' } };
  }

  public async creatMatches(body: BodyCreat): Promise<ServiceResponse<format[] | unknown>> {
    const {
      awayTeamGoals,
      awayTeamId,
      homeTeamGoals,
      homeTeamId,
    } = body;
    const error = await validate.validateNewMatches(homeTeamId, awayTeamId);
    if (error) return { status: error.status, data: { message: error.message } };
    const newMatches = await this.matchesModel.create({
      awayTeamGoals,
      awayTeamId,
      homeTeamGoals,
      homeTeamId,
      inProgress: true,
    });
    return { status: 201, data: newMatches };
  }
}
