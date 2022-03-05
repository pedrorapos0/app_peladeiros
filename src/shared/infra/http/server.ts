import app from '@shared/infra/http/app';

app.listen(process.env.APP_PORT, () => {
  console.log(`App is running, listening on port ${process.env.APP_PORT}`);
});
