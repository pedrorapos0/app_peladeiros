import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entites/User';
import AppError from '@shared/error/AppError';
import { deletFile } from '../../../../utils/file';

interface IRequest {
  avatar_user: string | undefined;
  user_id: string;
}

@injectable()
class UploadUserAvatarUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ avatar_user, user_id }: IRequest): Promise<User> {
    const userExist = await this.userRepository.findById(user_id);

    if (!userExist) {
      throw new AppError('User not exist!');
    }

    if (userExist.user_avatar) {
      await deletFile(userExist.user_avatar);
    }

    userExist.user_avatar = avatar_user as string;

    await this.userRepository.update(userExist);

    return userExist;
  }
}

export default UploadUserAvatarUseCase;
