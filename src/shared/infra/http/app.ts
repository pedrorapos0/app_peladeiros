import Express from 'express';
import 'dotenv/config';

const app = Express();

app.use(Express.json());

app.use('/', (request, response) => {
  return response.json({ mng: 'Hello Wordl!' });
});

export default app;
