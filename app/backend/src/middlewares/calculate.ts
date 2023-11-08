import matches from '../Interfaces/interMatches';

type results = {
  points: number,
  draws: number,
  victories: number,
  losses: number,
  goalsFavor: number,
  goalsOwn: number,
};

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

function points(allMatches: matches[]): results {
  return allMatches.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) {
      acc.points += 3;
      acc.victories += 1;
    }
    if (game.homeTeamGoals === game.awayTeamGoals) {
      acc.points += 1;
      acc.draws += 1;
    }
    if (game.homeTeamGoals < game.awayTeamGoals) {
      acc.losses += 1;
    }
    acc.goalsFavor += game.homeTeamGoals;
    acc.goalsOwn += game.awayTeamGoals;
    return acc;
  }, { points: 0, draws: 0, victories: 0, losses: 0, goalsFavor: 0, goalsOwn: 0 });
}

function order(infosTable: infoTeams[]): infoTeams[] {
  return infosTable.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }

    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    return b.goalsFavor - a.goalsFavor;
  });
}

// function utilization(payload: TokenPayload): string {
//   const token = jwt.sign(payload, secret);
//   return token;
// }

// function goalDifference(payload: TokenPayload): string {
//   const token = jwt.sign(payload, secret);
//   return token;
// }

export default {
  points,
  order,
  // utilization,
  // goalDifference,
};
