import User from '@modules/users/infra/typeorm/entites/User';
import HashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';
import request from 'supertest';
import app from '@shared/infra/http/app';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;
let hashProvider: HashProvider;
let userId: string;

describe('Delete user controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    hashProvider = new HashProvider();
    const passwordHashed = await hashProvider.hash('174777');
    userId = uuidV4();

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: userId,
        name: 'Warren Osborne',
        email: 'buh@kevgad.zm',
        birth_date: '2001-08-13',
        password: passwordHashed,
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to delete a user', async () => {
    const responseAuth = await request(app)
      .post('/sessions')
      .send({
        email: 'buh@kevgad.zm',
        password: '174777',
      })
      .set('Accept', 'application/json');

    const { token } = responseAuth.body;

    const response = await request(app)
      .delete(`/users/${userId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(204);
  });
});
