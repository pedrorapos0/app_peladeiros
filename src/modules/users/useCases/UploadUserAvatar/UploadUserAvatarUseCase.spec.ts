import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import UploadUserAvatarUseCase from '@modules/users/useCases/UploadUserAvatar/UploadUserAvatarUseCase';
import AppError from '@shared/error/AppError';

let userRepositoryInMemory: UserRepositoryInMemory;
let uploadUserAvatarUseCase: UploadUserAvatarUseCase;

describe('Update user avatar', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    uploadUserAvatarUseCase = new UploadUserAvatarUseCase(
      userRepositoryInMemory,
    );
  });

  it('Should be able to update user avatar', async () => {
    const user = await userRepositoryInMemory.create({
      name: 'Test',
      email: 'test@mail.com',
      birth_date: new Date('1979/08/22'),
      password: '123456',
    });

    await uploadUserAvatarUseCase.execute({
      avatar_user: 'avatar_user',
      user_id: user.id,
    });

    const userUpdated = await uploadUserAvatarUseCase.execute({
      avatar_user: 'avatar_user',
      user_id: user.id,
    });

    expect(userUpdated).toHaveProperty('user_avatar');
    expect(userUpdated.user_avatar).toEqual('avatar_user');
  });

  it('Should not be able to update user avatar to non-existent user', async () => {
    await expect(
      uploadUserAvatarUseCase.execute({
        avatar_user: 'avatar_user',
        user_id: 'user-non-exist',
      }),
    ).rejects.toEqual(new AppError('User not exist!'));
  });
});
