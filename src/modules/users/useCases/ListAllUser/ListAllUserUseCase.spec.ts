import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import ListAllUserUseCase from '@modules/users/useCases/ListAllUser/ListAllUserUseCase';
import CreateUserUseCase from '@modules/users/useCases/CreateUser/CreateUserUseCase';

let userReposiitory: UserRepositoryInMemory;
let listAllUserUseCase: ListAllUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('List all Users', () => {
  beforeEach(() => {
    userReposiitory = UserRepositoryInMemory.getInstance();
    createUserUseCase = new CreateUserUseCase(userReposiitory);
    listAllUserUseCase = new ListAllUserUseCase(userReposiitory);
  });

  it('Should be able to list all users', async () => {
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

    expect(users).toEqual(expect.arrayContaining([user1, user2]));
  });
});
