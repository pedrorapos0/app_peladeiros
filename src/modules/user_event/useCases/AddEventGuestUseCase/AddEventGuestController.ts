import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AddEventGuestUseCase from '@modules/user_event/useCases/AddEventGuestUseCase/AddEventGuestUseCase';

class AddEventGuestController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { event_id } = request.params;
    const { id } = request.user;

    const addEventGuestUsecase = container.resolve(AddEventGuestUseCase);
    await addEventGuestUsecase.execute({ event_id, guest_id: id });
    return response.status(200).send();
  }
}

export default AddEventGuestController;
