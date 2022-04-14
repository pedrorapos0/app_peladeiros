import User from '@modules/users/infra/typeorm/entites/User';
import HashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';
import request from 'supertest';
import app from '@shared/infra/http/app';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;
let hashProvider: HashProvider;

describe('User refreshToken controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    hashProvider = new HashProvider();
    const passwordHashed = await hashProvider.hash('605388');

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidV4(),
        name: 'Eugenia Coleman',
        email: 'tugeruv@ji.am',
        birth_date: '1989-09-24',
        password: passwordHashed,
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new user refreshtoken', async () => {
    const responseAuth = await request(app)
      .post('/sessions')
      .send({
        email: 'tugeruv@ji.am',
        password: '605388',
      })
      .set('Accept', 'application/json');

    const responseRefreshToken = await request(app).post(
      `/refreshtokens/${responseAuth.body.refresh_token}`,
    );

    expect(responseRefreshToken.status).toBe(200);
    expect(responseRefreshToken.body).toHaveProperty('token');
    expect(responseRefreshToken.body).toHaveProperty('userRefreshToken');
  });
});
