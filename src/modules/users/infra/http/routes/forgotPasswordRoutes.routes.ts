import { Router } from 'express';

import ForgotMyPasswordController from '@modules/users/useCases/ForgotMyPassword/ForgotMyPasswordController';

const forgotPasswordRoutes = Router();

const forgotMyPasswordController = new ForgotMyPasswordController();

forgotPasswordRoutes.post('/', forgotMyPasswordController.handler);

export default forgotPasswordRoutes;
