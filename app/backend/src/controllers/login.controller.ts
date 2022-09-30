import { Request, Response } from 'express';
import { IToken } from '../interfaces';
import LoginService from '../services/login.service';

export default class LoginController {
  private _loginService = new LoginService();

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { status, response } = await this._loginService.login(email, password);

    const token = response as IToken;

    return res.status(status).json({ token });
  }

  public async validate(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers as IToken;

    const { status, response } = await this._loginService.validate(authorization);

    return res.status(status).json(response);
  }
}
