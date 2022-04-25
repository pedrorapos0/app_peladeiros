import { Router } from 'express';
import CreateUserEventController from '@modules/user_event/useCases/CreateUserEventUseCase/CreateUserEventController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AddEventGuestController from '@modules/user_event/useCases/AddEventGuestUseCase/AddEventGuestController';

const userEventRouter = Router();
const createUserEventController = new CreateUserEventController();
const addEventGuestController = new AddEventGuestController();

userEventRouter.post(
  '/:event_id',
  ensureAuthentication,
  addEventGuestController.handler,
);

userEventRouter.post(
  '/',
  ensureAuthentication,
  createUserEventController.handler,
);

export default userEventRouter;
