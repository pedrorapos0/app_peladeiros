import { Router } from 'express';
import AuthenticateUserController from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import CreateUserRefreshTokenController from '@modules/users/useCases/CreateUserRefreshToken/CreateUserRefreshTokenController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const createUserRefreshTokenController = new CreateUserRefreshTokenController();

authenticateRoutes.post('/', authenticateUserController.handler);
authenticateRoutes.post(
  '/',
  ensureAuthentication,
  createUserRefreshTokenController.handler,
);

export default authenticateRoutes;
