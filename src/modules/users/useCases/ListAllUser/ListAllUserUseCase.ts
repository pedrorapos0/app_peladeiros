import User from '@modules/users/infra/typeorm/entites/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

class ListAllUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.listAll();
    return users;
  }
}

export default ListAllUserUseCase;
