import { Router } from 'express';
import CreateUserEventController from '@modules/user_event/useCases/CreateUserEventUseCase/CreateUserEventController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AddEventGuestController from '@modules/user_event/useCases/AddEventGuestUseCase/AddEventGuestController';
import ListAllEventGuestsController from '@modules/user_event/useCases/ListAllEventGuestsUseCase/ListAllEventGuestsController';
import ListAllUserEventResponsibleController from '@modules/user_event/useCases/ListAllUserEventResponsibleUseCase/ListAllUserEventResponsibleController';
import DeleteEventGuestController from '@modules/user_event/useCases/DeleteEventGuestUseCase/DeleteEventGuestController';
import DeleteUserEventController from '@modules/user_event/useCases/DeleteUserEventUseCase/DeleteUserEventController';

const userEventRouter = Router();
const createUserEventController = new CreateUserEventController();
const addEventGuestController = new AddEventGuestController();
const listAllEventGuestsController = new ListAllEventGuestsController();
const listAllUserEventResponsibleController =
  new ListAllUserEventResponsibleController();
const deleteEventGuestController = new DeleteEventGuestController();
const deleteUserEventController = new DeleteUserEventController();

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

userEventRouter.get(
  '/responsible/:responsible_id',
  ensureAuthentication,
  listAllUserEventResponsibleController.handler,
);

userEventRouter.delete(
  '/:event_id/guest',
  ensureAuthentication,
  deleteEventGuestController.handler,
);

userEventRouter.delete(
  '/:event_id/',
  ensureAuthentication,
  deleteUserEventController.handler,
);

export default userEventRouter;
