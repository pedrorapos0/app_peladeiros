import auth from '@config/auth';
import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import ResetPasswordUseCase from '@modules/users/useCases/ResetPassword/ResetPasswordUseCase';
import AppError from '@shared/error/AppError';
import { sign } from 'jsonwebtoken';
import {v4 as uuidV4} from 'uuid';

let userRepository: UserRepositoryInMemory;
let resetPasswordUseCase: ResetPasswordUseCase;

describe('Reset Password', () => {
  beforeEach(() => {
    userRepository = UserRepositoryInMemory.getInstance();
    resetPasswordUseCase = new ResetPasswordUseCase(userRepository);
  });

  it('Should be able to reset password', async () => {
    const updated = jest.spyOn(userRepository, 'update');

    const user = await userRepository.create({
      name: 'Teste',
      email: 'test@mail.com',
      birth_date: new Date('1990/01/01'),
      password: '123456',
    });

    const { secret_token, expered_token } = auth;
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expered_token,
    });

    await resetPasswordUseCase.execute(token, '1234567');

    expect(updated).toBeCalled();
  });

  it('Should not be able to reset password to token ivalid', async () => {
    await expect(
      resetPasswordUseCase.execute('token-ivalid', '1234567'),
    ).rejects.toEqual(new AppError('Token invalid!'));
  });

  it('Should not be able to reset password a user non-exist', async () => {
    const user_id_non_exist = uuidV4();
    const { secret_token, expered_token } = auth;
    const token = sign({}, secret_token, {
      subject: user_id_non_exist,
      expiresIn: expered_token,
    });

    await expect(
      resetPasswordUseCase.execute(token, '1234567'),
    ).rejects.toEqual(new AppError('User not exist!'));
  });
});
