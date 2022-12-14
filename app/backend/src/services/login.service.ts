import { compare } from 'bcryptjs';
import { sign, decode } from 'jsonwebtoken';
import 'dotenv/config';
import HttpException from '../shared/http.exception';
import User from '../database/models/user.model';
import { ILoginService, IResponseService, ITokenDecoded } from '../interfaces';

export default class LoginService implements ILoginService {
  public userModel = User;

  public login = async (email: string, password: string): Promise<IResponseService> => {
    const user = await this.userModel.findOne({ where: { email } }) as User;

    if (user?.email !== email) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const isPasswordValid = await compare(password, user.password);

    if (isPasswordValid === false) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return { status: 200, response: token } as IResponseService;
  };

  public validate = async (authorization: string): Promise<IResponseService> => {
    const token = authorization;

    if (!token) {
      throw new HttpException(401, 'Token not provided');
    }

    const tokenDecoded = decode(token) as ITokenDecoded;

    if (!tokenDecoded?.id) {
      throw new HttpException(401, 'Invalid token');
    }

    const user = await this.userModel.findOne({ where: { id: tokenDecoded.id } }) as User;

    if (!user) {
      throw new HttpException(401, 'Invalid token');
    }

    return { status: 200, response: { role: user.role } } as IResponseService;
  };
}
