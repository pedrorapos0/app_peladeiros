import { Request, Response } from 'express';
import CreateUserUseCase from '@modules/users/useCases/CreateUser/CreateUserUseCase';
import { container } from 'tsyringe';
import UserRepository from '@modules/users/infra/typeorm/repositories/implementations/UserRepository';

class CreateUserController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password, birth_date } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
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
