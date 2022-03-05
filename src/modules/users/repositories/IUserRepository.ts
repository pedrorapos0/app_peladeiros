import User from '@modules/users/infra/typeorm/entites/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  listAll(): Promise<User[]>;
  FindByEmail(email: string): Promise<User | undefined>;
}

export default IUserRepository;
