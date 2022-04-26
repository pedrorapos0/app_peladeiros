import { Request, Response } from 'express';

import ListAllEventGuests from '@modules/user_event/useCases/ListAllEventGuests/ListAllEventGuests';
import { container } from 'tsyringe';

class ListAllEventGuestsController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { event_id } = request.params;

   const listAllEventGuests = container.resolve(ListAllEventGuests);

    const guests = await listAllEventGuests.execute(event_id);

    return response.json(guests);
  }
}

export default ListAllEventGuestsController;
