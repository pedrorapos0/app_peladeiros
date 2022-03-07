import { Router } from 'express';
import CreateUserController from '@modules/users/useCases/CreateUser/CreateUserController';
import ListAllUserController from '@modules/users/useCases/ListAllUser/ListAllUserController';
import DeleteUserController from '@modules/users/useCases/DeleteUser/DeleteUserController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const userRoutes = Router();

const createUserController = new CreateUserController();
const listAllUserUseCase = new ListAllUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post('/', createUserController.handler);
userRoutes.get('/', ensureAuthentication, listAllUserUseCase.handler);
userRoutes.delete(
  '/:user_id',
  ensureAuthentication,
  deleteUserController.handler,
);

export default userRoutes;
