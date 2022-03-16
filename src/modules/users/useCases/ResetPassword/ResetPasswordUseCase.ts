import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';
import IHashProvider from '@shared/container/providers/HashProvider/interfaces/IHashProvider';

interface IPayload {
  sub: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute(token: string, newPassword: string): Promise<void> {
    const { secret_token } = auth;
    let user_id: string;
    try {
      let { sub } = verify(token, secret_token) as IPayload;
      user_id = sub;
    } catch {
      throw new AppError('Token invalid!');
    }

    const userExist = await this.userRepository.findById(user_id);

    if (!userExist) {
      throw new AppError('User not exist!');
    }
    const passwordHashed = await this.hashProvider.hash(newPassword);

    userExist.password = passwordHashed;

    await this.userRepository.update(userExist);
  }
}

export default ResetPasswordUseCase;
