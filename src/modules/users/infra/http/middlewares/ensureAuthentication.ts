import auth from '@config/auth';
import AppError from '@shared/error/AppError';
import { verify } from 'jsonwebtoken';

import {NextFunction, Request, Response} from 'express';

interface ITokenPayload {
  iat: number;

  exp: number;

  sub: string;
}

export default function ensureAuthentication(request: Request, response: Response, next: NextFunction): void  {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token is missing', 400);
  }

  const [, token] = authHeader.split(' ');
  const { secret_token } = auth;

  try {
    const decode = verify(token, secret_token);
    const { sub } = decode as ITokenPayload;
    request.user = {id: sub};
    return next();
  }catch{
    throw new AppError('Invalid JWT token', 401)
  }

}
