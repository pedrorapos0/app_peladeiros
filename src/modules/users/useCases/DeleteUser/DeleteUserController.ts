import { Request, Response } from 'express';
import DeleteUserUseCase from '@modules/users/useCases/DeleteUser/DeleteUserUseCase';
import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';

class DeleteUserController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params;
    const userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    const deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
    await deleteUserUseCase.execute(user_id);

    return response.status(204).send();
  }
}

export default DeleteUserController;
