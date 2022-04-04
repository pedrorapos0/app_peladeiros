import { Router } from 'express';
import CreateUserEventController from '@modules/user_event/useCases/CreateUserEventUseCase/CreateUserEventController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const createUserEventRouter = Router();
const createUserEventController = new CreateUserEventController();

createUserEventRouter.post(
  '/',
  ensureAuthentication,
  createUserEventController.handler,
);

export default createUserEventRouter;
