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
  goalsBalance: number,
  efficiency: string,
};

export default class UsersService {
  private matchesModel = MatchesModel;
  private teamsModel = TeamsModel;

  private async infosHome(allTeams: teams[]): Promise<infoTeams[] | unknown> {
    return Promise.all(allTeams.map(async (e: teams): Promise<object | void | unknown> => {
      const allMatches = await this.matchesModel.findAll({ where: { homeTeamId: e.id,
        inProgress: false } });
      const results = Calculate.points(allMatches, 'homeTeamGoals', 'awayTeamGoals');
      return {
        name: e.teamName,
        totalPoints: results.points,
        totalGames: allMatches.length,
        totalVictories: results.victories,
        totalDraws: results.draws,
        totalLosses: results.losses,
        goalsFavor: results.goalsFavor,
        goalsOwn: results.goalsOwn,
        goalsBalance: results.goalsFavor - results.goalsOwn,
        efficiency: ((results.points / (allMatches.length * 3)) * 100).toFixed(2),
      };
    }));
  }

  private async infosAway(allTeams: teams[]): Promise<infoTeams[] | unknown> {
    return Promise.all(allTeams.map(async (e: teams): Promise<object | void | unknown> => {
      const allMatches = await this.matchesModel.findAll({ where: { awayTeamId: e.id,
        inProgress: false } });
      const results = Calculate.points(allMatches, 'awayTeamGoals', 'homeTeamGoals');
      return {
        name: e.teamName,
        totalPoints: results.points,
        totalGames: allMatches.length,
        totalVictories: results.victories,
        totalDraws: results.draws,
        totalLosses: results.losses,
        goalsFavor: results.goalsFavor,
        goalsOwn: results.goalsOwn,
        goalsBalance: results.goalsFavor - results.goalsOwn,
        efficiency: ((results.points / (allMatches.length * 3)) * 100).toFixed(2),
      };
    }));
  }

  private async infosAll(allTeams: teams[]): Promise<infoTeams[] | unknown> {
    const infosHome = await this.infosHome(allTeams) as infoTeams[];
    const infosAway = await this.infosAway(allTeams) as infoTeams[];
    return Promise.all(infosHome.map(async (e: infoTeams): Promise<object | void | unknown> => {
      const infosTeam = await infosAway.filter((t) => e.name === t.name);
      return {
        name: e.name,
        totalPoints: e.totalPoints + infosTeam[0].totalPoints,
        totalGames: e.totalGames + infosTeam[0].totalGames,
        totalVictories: e.totalVictories + infosTeam[0].totalVictories,
        totalDraws: e.totalDraws + infosTeam[0].totalDraws,
        totalLosses: e.totalLosses + infosTeam[0].totalLosses,
        goalsFavor: e.goalsFavor + infosTeam[0].goalsFavor,
        goalsOwn: e.goalsOwn + infosTeam[0].goalsOwn,
        goalsBalance: e.goalsBalance + infosTeam[0].goalsBalance,
        efficiency: (((e.totalPoints + infosTeam[0].totalPoints)
          / ((e.totalGames + infosTeam[0].totalGames) * 3)) * 100).toFixed(2),
      };
    }));
  }

  public async getTableHome(): Promise<ServiceResponse<infoTeams[] | unknown>> {
    const allTeams = await this.teamsModel.findAll();
    const infosHome = await this.infosHome(allTeams) as infoTeams[];
    const orderTable = Calculate.order(infosHome);
    return { status: 200, data: orderTable };
  }

  public async getTableAway(): Promise<ServiceResponse<infoTeams[] | unknown>> {
    const allTeams = await this.teamsModel.findAll();
    const infosAway = await this.infosAway(allTeams) as infoTeams[];
    const orderTable = Calculate.order(infosAway);
    return { status: 200, data: orderTable };
  }

  public async getTableAll(): Promise<ServiceResponse<infoTeams[] | unknown>> {
    const allTeams = await this.teamsModel.findAll();
    const infosAway = await this.infosAll(allTeams) as infoTeams[];
    const orderTable = Calculate.order(infosAway);
    return { status: 200, data: orderTable };
  }
}
