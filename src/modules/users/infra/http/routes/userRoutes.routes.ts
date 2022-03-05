import { Router } from 'express';
import CreateUserController from '@modules/users/useCases/CreateUser/CreateUserController';
import ListAllUserController from '@modules/users/useCases/ListAllUser/ListAllUserController';
import DeleteUserController from '@modules/users/useCases/DeleteUser/DeleteUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const listAllUserUseCase = new ListAllUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post('/', createUserController.handler);
userRoutes.get('/', listAllUserUseCase.handler);
userRoutes.delete('/:user_id', deleteUserController.handler);

export default userRoutes;
