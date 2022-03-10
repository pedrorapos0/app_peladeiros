import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entites/User';

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    birth_date,
  }: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      name,
      email,
      password,
      birth_date,
    });
    await this.userRepository.save(user);
    return user;
  }

  public async listAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }
  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(user_id);
    return user;
  }
  public async delete(user_id: string): Promise<void> {
    await this.userRepository.delete(user_id);
  }

  public async update(user: User): Promise<User> {
    await this.userRepository.save(user);
    return user;
  }
}

export default UserRepository;
