import User from '@modules/users/infra/typeorm/entites/User';
import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import UpdateUserUseCase from '@modules/users/useCases/UpdateUserUseCase/UpdateUserUseCase';
import AppError from '@shared/error/AppError';

let updateUserUseCase: UpdateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Update User', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory);
  });

  it('should  be able to update a user', async () => {
    const user = await userRepositoryInMemory.create({
      name: 'Peter Jefferson',
      email: 'zo@gokvukmew.br',
      password: '414811',
      birth_date: new Date('05/28/2000'),
    });

    await updateUserUseCase.execute({
      id: user.id,
      name: 'Elmer Bridges',
    });

    await updateUserUseCase.execute({
      id: user.id,
      birth_date: new Date('10/20/1999'),
    });

    const userUpdated = (await userRepositoryInMemory.findByEmail(
      'zo@gokvukmew.br',
    )) as User;

    expect(user.id).toEqual(userUpdated.id);
    expect(userUpdated.name).toEqual('Elmer Bridges');
  });

  it('should not be able to update a user non-exist', async () => {
    await expect(
      updateUserUseCase.execute({
        id: 'user-non-exist',
        name: 'User test',
        birth_date: new Date('07/03/2021'),
      }),
    ).rejects.toEqual(new AppError('User does not exist!'));
  });
});
