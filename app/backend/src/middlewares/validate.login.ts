import { NextFunction, Request, Response } from 'express';

import ILogin from '../interfaces/ILogin';

const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const login = req.body as ILogin;

  if (!login.email || !login.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default validLogin;
