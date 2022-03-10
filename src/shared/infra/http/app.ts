import Express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '@shared/container';
import routes from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm/index';
import AppError from '@shared/error/AppError';

createConnection();

const app = Express();

app.use(Express.json());

app.use('/avatar',Express.static('tmp'));

app.use('/', routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
        status: error.statusCode,
      });
    }
    return response.status(500).json({
      message: `internal server error - ${error.message}`,
      status: 500,
    });
  },
);

export default app;
