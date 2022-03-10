import { Request, Response } from 'express';
import CreateUserUseCase from '@modules/users/useCases/CreateUser/CreateUserUseCase';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';

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

    return response.status(201).json(classToPlain(user));
  }
}

export default CreateUserController;
