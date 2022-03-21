import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserUseCase from './UpdateUserUseCase';

class UpdateUserUseCaseController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { name, birth_date } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const userUpdated = await updateUserUseCase.execute({
      id,
      name,
      birth_date,
    });

    return response.json(classToPlain(userUpdated));
  }
}

export default UpdateUserUseCaseController;
