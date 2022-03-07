import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import AutenticateUserUseCase from '@modules/users/useCases/AuthenticateUser/AutenticateUserUseCase';
import UserRefreshTokenRepositoryInmemory from '@modules/users/infra/typeorm/repositories/fakes/UserRefreshTokenRepositoryInmemory';
import DayjsProvider from '@shared/container/providers/DateManipulationProvider/implementations/DayjsProvider';
import AppError from '@shared/error/AppError';

let userRepository: UserRepositoryInMemory;
let dayjsProvider: DayjsProvider;
let userRefreshTokenRepository: UserRefreshTokenRepositoryInmemory;
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
    userRefreshTokenRepository =
      UserRefreshTokenRepositoryInmemory.getInstance();
    dayjsProvider = new DayjsProvider();
    autenticateUserUseCase = new AutenticateUserUseCase(
      userRepository,
      userRefreshTokenRepository,
      dayjsProvider,
    );
  });

  it('Should be able to autenticate a user', async () => {
    const { name, email, password, birth_date } = request;
    await userRepository.create({
      name,
      email,
      password,
      birth_date,
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
