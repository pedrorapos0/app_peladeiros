import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/multer';
import CreateUserController from '@modules/users/useCases/CreateUser/CreateUserController';
import ListAllUserController from '@modules/users/useCases/ListAllUser/ListAllUserController';
import DeleteUserController from '@modules/users/useCases/DeleteUser/DeleteUserController';
import UploadUserAvatarController from '@modules/users/useCases/UploadUserAvatar/UploadUserAvatarController';
import UpdateUserUseCaseController from '@modules/users/useCases/UpdateUserUseCase/UpdateUserUseCaseController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const userRoutes = Router();
const uploadAvatar = multer(multerConfig);

const createUserController = new CreateUserController();
const listAllUserUseCase = new ListAllUserController();
const deleteUserController = new DeleteUserController();
const uploadUserAvatarController = new UploadUserAvatarController();
const updateUserUseCaseController = new UpdateUserUseCaseController();

userRoutes.post('/', createUserController.handler);
userRoutes.get('/', ensureAuthentication, listAllUserUseCase.handler);
userRoutes.delete(
  '/:user_id',
  ensureAuthentication,
  deleteUserController.handler,
);
userRoutes.put('/', ensureAuthentication, updateUserUseCaseController.handler);
userRoutes.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  uploadUserAvatarController.handler,
);

export default userRoutes;
