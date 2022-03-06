import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(user_id: string): Promise<void> {
    const userExist = await this.userRepository.findById(user_id);
    if (!userExist) {
      throw new AppError('User not found!');
    }
    await this.userRepository.delete(user_id);
  }
}

export default DeleteUserUseCase;
