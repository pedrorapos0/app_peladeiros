import { Router } from 'express';

import ResetPasswordController from '@modules/users/useCases/ResetPassword/ResetPasswordController';

const resetPasswordRoutes = Router();

const resetPasswordController = new ResetPasswordController();

resetPasswordRoutes.patch('/', resetPasswordController.handler);

export default resetPasswordRoutes;
