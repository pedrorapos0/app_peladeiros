import User from '@modules/users/infra/typeorm/entites/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  listAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  delete(user_id: string): Promise<void>;
}

export default IUserRepository;
