import Express from 'express';
import 'dotenv/config';
import routes from '@shared/infra/http/routes';

const app = Express();

app.use(Express.json());

app.use('/', routes);

export default app;
