import { Request, Response, NextFunction } from 'express';
import jwt from '../middlewares/jwt.util';
import UsersModel from '../database/models/UsersModel';

function extractToken(bearerToken: string) {
  return bearerToken.split(' ')[1];
}

async function verify(req: Request, res: Response, next: NextFunction)
  : Promise<object | undefined> {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = extractToken(bearerToken);
  try {
    const decoded = jwt.verify(token);
    const user = await UsersModel.findByPk(decoded.id);
    if (!user) {
      return res.status(402).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.body = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  return undefined;
}

export default verify;
//   private model = UsersModel;

//   public async verify(req: Request, res: Response, next: NextFunction)
//     : Promise<object | undefined> {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ message: 'Token not found' });
//     }
//     const decoded = jwt.verify(token);
//     const user = await this.model.findAll();
//     console.log(user);
//     try {
//       if (!user) {
//         return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
//       }

//       req.body = user;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Token must be a valid token' });
//     }
//   }
// }
