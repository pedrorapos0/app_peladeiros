import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/userRoutes.routes';
import authenticateRoutes from '@modules/users/infra/http/routes/authenticateRoutes.routes';
import refreshTokenRoutes from '@modules/users/infra/http/routes/refreshTokenRoutes.routes';
import forgotPasswordRoutes from '@modules/users/infra/http/routes/forgotPasswordRoutes.routes';
import resetPasswordRoutes from '@modules/users/infra/http/routes/resetPasswordRoutes.routes';
import userEventRoutes from '@modules/user_event/infra/http/routes/userEvent.routes';


const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', authenticateRoutes);
routes.use('/refreshtokens', refreshTokenRoutes);
routes.use('/forgotpassword', forgotPasswordRoutes);
routes.use('/resetpassword', resetPasswordRoutes);
routes.use('/events', userEventRoutes);

export default routes;
