// import schemas from './schemas';

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
}

export default {
  validateBodyLogin,
};
