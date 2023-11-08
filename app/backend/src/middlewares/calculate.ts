import matches from '../Interfaces/interMatches';

type results = {
  points: number,
  draws: number,
  victories: number,
  losses: number,
  goalsFavor: number,
  goalsOwn: number,
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
  // utilization,
  // goalDifference,
};
