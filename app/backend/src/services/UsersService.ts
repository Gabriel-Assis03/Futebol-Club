import bcrypt = require('bcryptjs');
import UsersModel from '../database/models/UsersModel';
import jwt from '../middlewares/jwt.util';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import user from '../Interfaces/interUsers';
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
    // teste pois nao tenho a senha sem cripto
    // if (!foundUser || body.password === foundUser.dataValues.password) {
    //   const { id, username } = foundUser;
    //   const token = jwt.sign({ id, username });
    //   return { status: 201, data: { token } };
    // }
    if (!foundUser || !bcrypt.compareSync(body.password, foundUser.dataValues.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const { id, username } = foundUser;
    const token = jwt.sign({ id, username });
    return { status: 200, data: { token } };
  }

  public async role(token: string | undefined): Promise<ServiceResponse<object>> {
    function extractToken(bearerToken: string) {
      return bearerToken.split(' ')[1];
    }
    if (token) {
      const decoded = jwt.verify(extractToken(token));
      const user = await this.model.findByPk(decoded.id);
      if (user) {
        return { status: 200, data: { role: user.role } };
      }
    }
    return { status: 400, data: { message: 'no rule' } };
  }
}
