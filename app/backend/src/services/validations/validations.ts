import schemas from './schemas';

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

export default {
  validateBodyLogin,
};
