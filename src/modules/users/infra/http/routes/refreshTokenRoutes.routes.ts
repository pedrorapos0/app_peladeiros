import { Router } from 'express';

import CreateUserRefreshTokenController from '@modules/users/useCases/CreateUserRefreshToken/CreateUserRefreshTokenController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const refreshTokenRoutes = Router();

const createUserRefreshTokenController = new CreateUserRefreshTokenController();

refreshTokenRoutes.post(
  '/:userRefreshtoken',
  createUserRefreshTokenController.handler,
);

export default refreshTokenRoutes;
