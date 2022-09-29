import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../database/models/user.model';
import { ILoginService, IResponseService } from '../interfaces';

export default class LoginService implements ILoginService {
  public userModel = User;

  public login = async (email: string, password: string): Promise<IResponseService> => {
    const user = await this.userModel.findOne({ where: { email } }) as unknown as User;

    if (!user) {
      return { status: 404, response: 'user not found' };
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return { status: 401, response: 'password incorrect' };
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return { status: 200, response: token } as IResponseService;
  };
}
