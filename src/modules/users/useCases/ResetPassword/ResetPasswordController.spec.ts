import User from '@modules/users/infra/typeorm/entites/User';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import request from 'supertest';
import app from '@shared/infra/http/app';
import BcryptjsHashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';

let connection: Connection;

describe('Reset password controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    const hashProvider = new BcryptjsHashProvider();
    const passwordhashed = await hashProvider.hash('078859');
    await connection.runMigrations();

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidV4(),
        email: 'uripe@idosodkoc.pw',
        name: 'Leroy Bell',
        birth_date: '2002-08-07',
        password: passwordhashed,
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to reset password', async () => {
    const responseForgotPassowrd = await request(app)
      .post('/forgotpassword')
      .send({
        email: 'uripe@idosodkoc.pw',
      })
      .set('Accept', 'application/json');

    console.log(responseForgotPassowrd);

    const response = await request(app)
      .patch('/resetpassword')
      .send({
        password: '815146',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
  });
});
