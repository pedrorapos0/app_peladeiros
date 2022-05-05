import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteUserEventUseCase from '../DeleteUserEventUseCase/DeleteUserEventUseCase';

class DeleteUserEventController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { event_id } = request.params;
    const responsible_id = request.user.id;
    const deleteUserEventUseCase = container.resolve(DeleteUserEventUseCase);

    await deleteUserEventUseCase.execute(event_id, responsible_id);
    return response.status(201).send();
  }
}

export default DeleteUserEventController;
