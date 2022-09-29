import { Request, Response } from 'express';
import { IToken } from '../interfaces';
import LoginService from '../services/login.service';

export default class LoginController {
  private _loginService = new LoginService();

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { status, response } = await this._loginService.login(email, password);

    if (status !== 200) {
      return res.status(status).json({ message: response });
    }

    const token = response as IToken;

    return res.status(status).json({ token });
  }
}
