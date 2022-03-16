import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entites/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@shared/container/providers/HashProvider/interfaces/IHashProvider';
@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRespository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {
    this.userRespository = userRespository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    name,
    email,
    password,
    birth_date,
  }: ICreateUserDTO): Promise<User> {
    const emailExist = await this.userRespository.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email already exists!');
    }

    const passwordHashed = await this.hashProvider.hash(password);

    const user = await this.userRespository.create({
      name,
      email,
      password: passwordHashed,
      birth_date,
    });

    return user;
  }
}

export default CreateUserUseCase;
