// import bcrypt = require('bcryptjs');
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
// import jwt from '../middlewares/jwt.util';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import matches from '../Interfaces/interMatches';
// import validate from './validations/validations';

export default class UsersService {
  private matchesModel = MatchesModel;
  private teamsModel = TeamsModel;

  private format2(element: any): object {
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

  private async format(allMatches: any): Promise<object[]> {
    const ret = await Promise.all(
      allMatches.map(async (e: matches): Promise<object | void> => {
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

  public async getAll(): Promise<ServiceResponse<object[]>> {
    const allMatches = await this.matchesModel.findAll();
    const ret = await this.format(allMatches);
    return { status: 200, data: ret };
  }
}
