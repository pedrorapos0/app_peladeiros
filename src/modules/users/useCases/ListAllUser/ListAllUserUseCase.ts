import User from '@modules/users/infra/typeorm/entites/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
@injectable()
class ListAllUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.listAll();
    return users;
  }
}

export default ListAllUserUseCase;
