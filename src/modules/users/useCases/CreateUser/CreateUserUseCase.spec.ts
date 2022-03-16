import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import CreateUserUseCase from '@modules/users/useCases/CreateUser/CreateUserUseCase';
import HashProviderFake from '@shared/container/providers/HashProvider/fakes/HashProviderFake';
import AppError from '@shared/error/AppError';

let userRepository: UserRepositoryInMemory;
let hashProviderFake: HashProviderFake;
let createUserUseCase: CreateUserUseCase;
const request = {
  name: 'Pedro Raposo',
  email: 'pedroraposoneto@gmail.com',
  password: '123456',
  birth_date: new Date('01/07/1986'),
};

describe('Create User', () => {
  beforeEach(() => {
    userRepository = UserRepositoryInMemory.getInstance();
    hashProviderFake = new HashProviderFake();
    createUserUseCase = new CreateUserUseCase(userRepository, hashProviderFake);
  });

  it('Should be able to create a new user', async () => {
    const { name, email, password, birth_date } = request;
    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      birth_date,
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with an existing email', async () => {
    const { name, email, password, birth_date } = request;
    await expect(
      createUserUseCase.execute({
        name,
        email,
        password,
        birth_date,
      }),
    ).rejects.toEqual(new AppError('Email already exists!'));
  });
});
