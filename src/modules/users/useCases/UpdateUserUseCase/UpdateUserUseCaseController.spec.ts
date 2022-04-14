import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import request from 'supertest';

import User from '@modules/users/infra/typeorm/entites/User';
import app from '@shared/infra/http/app';
import HashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';

let connection: Connection;
let hashProvider: HashProvider;

describe('update user controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    hashProvider = new HashProvider();
    const passwordHashed = await hashProvider.hash('574259');

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidV4(),
        name: 'Delia Erickson',
        email: 'uchopcek@lukob.ws',
        birth_date: '2004-01-27',
        password: passwordHashed,
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should  be able to update a user', async () => {
    const responseAuth = await request(app)
      .post('/sessions')
      .send({
        email: 'uchopcek@lukob.ws',
        password: '574259',
      })
      .set('Accept', 'application/json');

    const response = await request(app)
      .put('/users')
      .send({ name: 'Laura Mason' })
      .set({ Authorization: `Bearer ${responseAuth.body.token}` });

    const { name } = response.body;

    expect(response.status).toBe(200);
    expect(name).toBe('Laura Mason');
  });
});
