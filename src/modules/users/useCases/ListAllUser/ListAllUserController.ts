import { Request, Response } from 'express';
import ListAllUserUseCase from '@modules/users/useCases/ListAllUser/ListAllUserUseCase';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';

class ListAllUserController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllUserUseCase = container.resolve(ListAllUserUseCase);
    const users = await listAllUserUseCase.execute();

    return response.json(classToPlain(users));
  }
}

export default ListAllUserController;
