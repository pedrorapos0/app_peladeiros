import app from '@shared/infra/http/app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

let connection: Connection;
describe('Create User controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Tony Rice',
        email: 'hu@memmo.be',
        password: '489787',
        birth_date: '1995-08-02',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
  });
});
