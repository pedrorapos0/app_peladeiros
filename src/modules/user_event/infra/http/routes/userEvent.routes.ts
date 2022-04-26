import { Router } from 'express';
import CreateUserEventController from '@modules/user_event/useCases/CreateUserEventUseCase/CreateUserEventController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AddEventGuestController from '@modules/user_event/useCases/AddEventGuestUseCase/AddEventGuestController';
import ListAllEventGuestsController from '@modules/user_event/useCases/ListAllEventGuests/ListAllEventGuestsController';

const userEventRouter = Router();
const createUserEventController = new CreateUserEventController();
const addEventGuestController = new AddEventGuestController();
const listAllEventGuestsController = new ListAllEventGuestsController();

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

userEventRouter.get(
  '/:event_id',
  ensureAuthentication,
  listAllEventGuestsController.handler,
);

export default userEventRouter;
