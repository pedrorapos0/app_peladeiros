import { hash } from 'bcryptjs';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entites/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
@injectable()
class CreateUserUseCase {

  constructor(
    @inject('UserRepository') private userRespository: IUserRepository,
  ) {
    this.userRespository = userRespository;
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

    const passwordHashed = await hash(password, 8);

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
