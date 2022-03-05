import { Request, Response } from 'express';
import ListAllUserUseCase from '@modules/users/useCases/ListAllUser/ListAllUserUseCase';
import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';

class ListAllUserController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    const listAllUserUseCase = new ListAllUserUseCase(userRepositoryInMemory);
    const users = await listAllUserUseCase.execute();

    return response.json(users);
  }
}

export default ListAllUserController;
