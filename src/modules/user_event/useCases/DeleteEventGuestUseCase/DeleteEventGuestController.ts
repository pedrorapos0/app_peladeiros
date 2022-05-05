import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteEventGuestUseCase from '@modules/user_event/useCases/DeleteEventGuestUseCase/DeleteEventGuestUseCase';
class DeleteEventGuestController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const guest_id = request.body.guest_id ?? request.user.id;
    const { event_id } = request.params;

    const deleteEventGuestUseCase = container.resolve(DeleteEventGuestUseCase);

    await deleteEventGuestUseCase.execute(guest_id, event_id);

    return response.status(201).send();
  }
}

export default DeleteEventGuestController;
