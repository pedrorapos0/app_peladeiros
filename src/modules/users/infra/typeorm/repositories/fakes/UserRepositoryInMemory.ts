import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entites/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { hash } from 'bcryptjs';

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];
  private static instance: UserRepositoryInMemory | undefined;

  private constructor() {}

  public static getInstance(): UserRepositoryInMemory {
    if (!this.instance) {
      this.instance = new UserRepositoryInMemory();
    }

    return this.instance;
  }

  public async create({
    name,
    email,
    password,
    birth_date,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    const passwordhashed = await hash(password, 8);
    Object.assign(user, { name, email, password: passwordhashed, birth_date });
    this.users.push(user);
    return user;
  }

  public async listAll(): Promise<User[]> {
    return this.users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === user_id);
    return user;
  }

  public async delete(user_id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === user_id);
    this.users.splice(userIndex, 1);
  }
  public async update(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      userStoraged => userStoraged.id === user.id,
    );
    this.users[userIndex] = user;

    return user;
  }
}

export default UserRepositoryInMemory;
