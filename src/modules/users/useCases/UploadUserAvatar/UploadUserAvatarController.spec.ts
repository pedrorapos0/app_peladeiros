import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import request from 'supertest';
import { resolve } from 'path';

import User from '@modules/users/infra/typeorm/entites/User';
import HashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';
import app from '@shared/infra/http/app';

let connection: Connection;
let hashProvider: HashProvider;
const userAvatar = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  'tmp',
  'download.png',
);

describe('Upload user avatar controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    hashProvider = new HashProvider();
    const passwordHashed = await hashProvider.hash('434497');
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidV4(),
        name: 'Leila Welch',
        email: 'rew@eguif.nf',
        birth_date: '1997-05-06',
        password: passwordHashed,
      })
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to update user avatar', async () => {
    const responseAuth = await request(app)
      .post('/sessions')
      .send({
        email: 'rew@eguif.nf',
        password: '434497',
      })
      .set('Accept', 'application/json');

    console.log(userAvatar);

    const response = await request(app)
      .patch('/users/avatar')
      .attach('avatar', userAvatar)
      .set({ Authorization: `Bearer ${responseAuth.body.token}` })
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user_avatar');
  });
});
