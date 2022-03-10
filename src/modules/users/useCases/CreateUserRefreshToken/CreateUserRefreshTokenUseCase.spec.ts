import CreateUserRefreshTokenUseCase from '@modules/users/useCases/CreateUserRefreshToken/CreateUserRefreshTokenUseCase';
import UserRefreshTokenRepositoryInmemory from '@modules/users/infra/typeorm/repositories/fakes/UserRefreshTokenRepositoryInmemory';
import DayjsProvider from '@shared/container/providers/DateManipulationProvider/implementations/DayjsProvider';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/error/AppError';

let createUserRefreshTokenUseCase: CreateUserRefreshTokenUseCase;
let userRefreshTokenRepositoryInmemory: UserRefreshTokenRepositoryInmemory;
let dayjsProvider: DayjsProvider;

describe('Create User RefreshToken', () => {
  beforeEach(() => {
    userRefreshTokenRepositoryInmemory =
      UserRefreshTokenRepositoryInmemory.getInstance();
    dayjsProvider = new DayjsProvider();
    createUserRefreshTokenUseCase = new CreateUserRefreshTokenUseCase(
      userRefreshTokenRepositoryInmemory,
      dayjsProvider,
    );
  });

  it('Should be able to create a new user refreshtoken', async () => {
    const { secret_refreshToken, expered_refreshToken } = auth;
    const email = 'test@email.com';
    const refresh_token = sign({ email }, secret_refreshToken, {
      subject: 'user_id',
      expiresIn: expered_refreshToken,
    });
    await userRefreshTokenRepositoryInmemory.create({
      refresh_token,
      user_id: 'user_id',
      date_expiration: new Date(),
    });

    const response = await createUserRefreshTokenUseCase.execute(refresh_token);

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('userRefreshToken');
  });

  it('Should not be able to create a new user refreshtoken to non-exist refreshtoken', async () => {
    await expect(
      createUserRefreshTokenUseCase.execute('refreshToken-non-exist'),
    ).rejects.toEqual(new AppError('Refresh token does not exist', 401));
  });
});
