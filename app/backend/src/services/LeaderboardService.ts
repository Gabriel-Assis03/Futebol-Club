// import bcrypt = require('bcryptjs');
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import Calculate from '../middlewares/calculate';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import matches from '../Interfaces/interMatches';
import teams from '../Interfaces/interTeams';
// import validate from './validations/validations';

type infoTeams = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
};

export default class UsersService {
  private matchesModel = MatchesModel;
  private teamsModel = TeamsModel;

  private async infosHome(allTeams: teams[]): Promise<object> {
    const ret = await Promise.all(
      allTeams.map(async (e: teams): Promise<object | void | unknown> => {
        const allMatches = await this.matchesModel.findAll({ where: { homeTeamId: e.id,
          inProgress: false } });
        const results = Calculate.points(allMatches);
        return {
          name: e.teamName,
          totalPoints: results.points,
          totalGames: allMatches.length,
          totalVictories: results.victories,
          totalDraws: results.draws,
          totalLosses: results.losses,
          goalsFavor: results.goalsFavor,
          goalsOwn: results.goalsOwn,
        };
      }),
    );
    return ret;
  }

  public async getTable(): Promise<ServiceResponse<infoTeams[] | unknown>> {
    const allTeams = await this.teamsModel.findAll();
    const infosHome = await this.infosHome(allTeams);
    return { status: 200, data: infosHome };
  }
}
