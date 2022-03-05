import { Request, Response } from 'express';
import CreateUserUseCase from '@modules/users/useCases/CreateUser/CreateUserUseCase';
import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';

class CreateUserController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password, birth_date } = request.body;
    const userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    const createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      birth_date,
    });

    return response.status(201).json(user);
  }
}

export default CreateUserController;
