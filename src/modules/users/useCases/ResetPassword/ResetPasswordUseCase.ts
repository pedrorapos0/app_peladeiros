import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';

interface IPayload {
  sub: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(token: string, newPassword: string): Promise<void> {
    const { secret_token } = auth;
    try {
      let { sub: user_id } = verify(token, secret_token) as IPayload;
      const userExist = await this.userRepository.findById(user_id);

      if (!userExist) {
        throw new AppError('User not exist!');
      }
      const passwordHashed = await hash(newPassword, 8);

      userExist.password = passwordHashed;

      await this.userRepository.update(userExist);
    } catch {
      throw new AppError('Token invalid!');
    }
  }
}

export default ResetPasswordUseCase;
