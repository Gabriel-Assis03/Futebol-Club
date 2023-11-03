import bcrypt = require('bcryptjs');
import UsersModel from '../database/models/UsersModel';
import jwt from '../middlewares/jwt.util';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import validate from './validations/validations';

type Body = {
  password: string,
  email: string
};

export default class UsersService {
  private model = UsersModel;

  public async login(body: Body): Promise<ServiceResponse<object>> {
    const error1 = await validate.validateBodyLogin(body);
    if (error1) return { status: error1.status, data: { message: error1.message } };
    const foundUser = await this.model.findOne({ where: { email: body.email } });
    if (!foundUser || !bcrypt.compareSync(body.password, foundUser.dataValues.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const { id, username } = foundUser;
    const token = jwt.sign({ id, username });
    return { status: 200, data: { token } };
  }
}
