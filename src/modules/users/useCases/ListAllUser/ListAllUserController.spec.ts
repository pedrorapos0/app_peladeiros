import User from '@modules/users/infra/typeorm/entites/User';
import HashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';
import request from 'supertest';
import app from '@shared/infra/http/app';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;
let hashProvider: HashProvider;

describe('List users controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    hashProvider = new HashProvider();
    const passwordHashed1 = await hashProvider.hash('823220');
    const passwordHashed2 = await hashProvider.hash('687522');

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidV4(),
        name: 'Calvin Swanson',
        email: 'ehikif@zarhassa.dz',
        birth_date: '2003-02-17',
        password: passwordHashed1,
      })
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidV4(),
        name: 'Jacob Vasquez',
        email: 'pughajot@hubjo.kw',
        birth_date: '1991-02-19',
        password: passwordHashed2,
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list all users', async () => {
    const responseAuth = await request(app)
      .post('/sessions')
      .send({
        email: 'ehikif@zarhassa.dz',
        password: '823220',
      })
      .set('Accept', 'application/json');

    const { token } = responseAuth.body;

    const response = await request(app)
      .get('/users')
      .set({
        Authorization: `Bearer ${token}`,
      });

    const listUsers = response.body as User[];

    expect(response.status).toBe(200);
    expect(listUsers.length).toBe(2);
  });
});
