import { Request, Response } from 'express';
import DeleteUserUseCase from '@modules/users/useCases/DeleteUser/DeleteUserUseCase';
import { container } from 'tsyringe';

class DeleteUserController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);
    await deleteUserUseCase.execute(user_id);

    return response.status(204).send();
  }
}

export default DeleteUserController;
