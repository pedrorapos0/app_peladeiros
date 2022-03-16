import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import CreateUserUseCase from '@modules/users/useCases/CreateUser/CreateUserUseCase';
import ListAllUserUseCase from '@modules/users/useCases/ListAllUser/ListAllUserUseCase';
import DeleteUserUseCase from '@modules/users/useCases/DeleteUser/DeleteUserUseCase';
import AppError from '@shared/error/AppError';
import HashProviderFake from '@shared/container/providers/HashProvider/fakes/HashProviderFake';

let userRepository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let hashProviderFake: HashProviderFake;
let listAllUserUseCase: ListAllUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete User', () => {
  beforeAll(() => {
    userRepository = UserRepositoryInMemory.getInstance();
    hashProviderFake = new HashProviderFake();
    createUserUseCase = new CreateUserUseCase(userRepository, hashProviderFake);
    listAllUserUseCase = new ListAllUserUseCase(userRepository);
    deleteUserUseCase = new DeleteUserUseCase(userRepository);
  });

  it('should be able to delete a user', async () => {
    const request1 = {
      name: 'Pedro Raposo',
      email: 'pedroraposoneto@gmail.com',
      password: '123456',
      birth_date: new Date('01/07/1986'),
    };

    const request2 = {
      name: 'Michely lima',
      email: 'michely.lima@gmail.com',
      password: '123456',
      birth_date: new Date('07/04/1996'),
    };

    const user1 = await createUserUseCase.execute({
      name: request1.name,
      email: request1.email,
      password: request1.password,
      birth_date: request1.birth_date,
    });

    const user2 = await createUserUseCase.execute({
      name: request2.name,
      email: request2.email,
      password: request2.password,
      birth_date: request2.birth_date,
    });

    const users = await listAllUserUseCase.execute();

    await deleteUserUseCase.execute(user1.id);

    expect(users).toEqual(expect.arrayContaining([user2]));
  });

  it('Should not be able to delete a non-existent user', async () => {
    await expect(
      deleteUserUseCase.execute('non-exist-user-id'),
    ).rejects.toEqual(new AppError('User not found!'));
  });
});
