import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import HashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';

import app from '@shared/infra/http/app';
import User from '@modules/users/infra/typeorm/entites/User';

let connection: Connection;
let hashProvider: HashProvider;

describe('Authenticate user controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    hashProvider = new HashProvider();

    const passwordHashed = await hashProvider.hash('843757');

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidV4(),
        birth_date: '1993-07-08',
        email: 'do@vijo.bz',
        name: 'Arthur Newman',
        password: passwordHashed,
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to autenticate a user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'do@vijo.bz',
        password: '843757',
      })
      .set('Accept', 'application/json');

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('refresh_token');
    expect(response.status).toBe(200);
  });
});
