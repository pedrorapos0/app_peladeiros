import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserEventUseCase from '@modules/user_event/useCases/CreateUserEventUseCase/CreateUserEventUseCase';

class CreateUserEventController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      title,
      start_date,
      end_date,
      minimum_number_guests,
      maximum_number_guests,
    } = request.body;

    const { id: responsible_id } = request.user;

    const createUserEventUseCase = container.resolve(CreateUserEventUseCase);

    const event = await createUserEventUseCase.execute({
      responsible_id,
      title,
      start_date,
      end_date,
      minimum_number_guests,
      maximum_number_guests,
    });
    return response.status(201).json(event);
  }
}

export default CreateUserEventController;
