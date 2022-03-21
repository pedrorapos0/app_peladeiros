import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import User from '@modules/users/infra/typeorm/entites/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({
    id,
    name,
    birth_date,
  }: IUpdateUserDTO): Promise<User> {
    const userExist = await this.userRepository.findById(id);
    if (!userExist) {
      throw new AppError('User does not exist!');
    }

    if (name) {
      userExist.name = name;
    }

    if (birth_date) {
      userExist.birth_date = birth_date;
    }

    await this.userRepository.update(userExist);

    return userExist;
  }
}

export default UpdateUserUseCase;
