import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import AutenticateUserUseCase from '@modules/users/useCases/AuthenticateUser/AuthenticateUserUseCase';
import UserRefreshTokenRepositoryInmemory from '@modules/users/infra/typeorm/repositories/fakes/UserRefreshTokenRepositoryInmemory';
import HashProviderFake from '@shared/container/providers/HashProvider/fakes/HashProviderFake';
import DayjsProvider from '@shared/container/providers/DateManipulationProvider/implementations/DayjsProvider';
import AppError from '@shared/error/AppError';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';

let userRepository: UserRepositoryInMemory;
let dayjsProvider: DayjsProvider;
let hashProviderFake: HashProviderFake;
let userRefreshTokenRepositoryInmemory: UserRefreshTokenRepositoryInmemory;
let autenticateUserUseCase: AutenticateUserUseCase;
const request = {
  name: 'Pedro Raposo',
  email: 'pedroraposoneto@gmail.com',
  password: '123456',
  birth_date: new Date('01/07/1986'),
};

describe('Autenticate user', () => {
  beforeEach(() => {
    userRepository = UserRepositoryInMemory.getInstance();
    userRefreshTokenRepositoryInmemory =
      UserRefreshTokenRepositoryInmemory.getInstance();
    dayjsProvider = new DayjsProvider();
    hashProviderFake = new HashProviderFake();
    autenticateUserUseCase = new AutenticateUserUseCase(
      userRepository,
      userRefreshTokenRepositoryInmemory,
      dayjsProvider,
      hashProviderFake,
    );
  });

  it('Should be able to autenticate a user', async () => {
    const { name, email, password, birth_date } = request;
    const user = await userRepository.create({
      name,
      email,
      password,
      birth_date,
    });

    const { secret_refreshToken, expered_refreshToken } = auth;
    const refresh_token = sign({ email }, secret_refreshToken, {
      subject: user.id,
      expiresIn: expered_refreshToken,
    });
    await userRefreshTokenRepositoryInmemory.create({
      refresh_token,
      user_id: user.id,
      date_expiration: new Date(),
    });

    const response = await autenticateUserUseCase.execute(email, password);

    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate a user with email not-exist', async () => {
    await expect(
      autenticateUserUseCase.execute('test@mail.com', '123456'),
    ).rejects.toEqual(new AppError('email or password incorrect!', 404));
  });

  it('Should not be able to authenticate a user with password incorrect', async () => {
    const { email } = request;

    await expect(
      autenticateUserUseCase.execute(email, 'incorrect-password'),
    ).rejects.toEqual(new AppError('email or password incorrect!', 404));
  });
});
