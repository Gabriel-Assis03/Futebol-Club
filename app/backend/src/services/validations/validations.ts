import schemas from './schemas';
import TeamsModel from '../../database/models/TeamsModel';

type BodyLogin = {
  password: string;
  email: string;
};

type Erro = {
  status: number;
  message: string;
};

async function validateBodyLogin(body: BodyLogin): Promise<Erro | undefined> {
  const { password, email } = body;
  if (!password || !email) return { status: 400, message: 'All fields must be filled' };
  const error1 = schemas.emailSchema.validate(email);
  const error2 = schemas.passwordSchema.validate(password);
  if (error1.error || error2.error) return { status: 401, message: 'Invalid email or password' };
}

async function validateNewMatches(t1: number, t2: number): Promise<Erro | undefined> {
  if (t1 === t2) {
    return { status: 422,
      message: 'It is not possible to create a match with two equal teams' };
  }
  const team1 = await TeamsModel.findAll({ where: { id: t1 } });
  const team2 = await TeamsModel.findAll({ where: { id: t2 } });
  if (team1.length === 0) return { status: 404, message: 'There is no team with such id!' };
  if (team2.length === 0) return { status: 404, message: 'There is no team with such id!' };
}

export default {
  validateBodyLogin,
  validateNewMatches,
};
