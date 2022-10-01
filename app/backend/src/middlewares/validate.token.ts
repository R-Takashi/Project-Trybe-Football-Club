import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { ITokenDecoded } from '../interfaces';
import User from '../database/models/user.model';

const validToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  const { id } = verify(authorization, process.env.JWT_SECRET as string) as ITokenDecoded;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validToken;
