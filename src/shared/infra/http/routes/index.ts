import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/userRoutes.routes';
import authenticateRoutes from '@modules/users/infra/http/routes/authenticateRoutes.routes';
import refreshTokenRoutes from '@modules/users/infra/http/routes/refreshTokenRoutes.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', authenticateRoutes);
routes.use('/refreshtokens', refreshTokenRoutes);

export default routes;
