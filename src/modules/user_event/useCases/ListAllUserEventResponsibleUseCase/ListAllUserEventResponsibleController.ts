import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllUserEventResponsibleUseCase from '@modules/user_event/useCases/ListAllUserEventResponsibleUseCase/ListAllUserEventResponsibleUseCase';

class ListAllUserEventResponsibleController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { responsible_id } = request.params;
    const listAllUserEventResponsible = container.resolve(
      ListAllUserEventResponsibleUseCase,
    );
    const listEvents = await listAllUserEventResponsible.execute(
      responsible_id,
    );
    return response.json(listEvents);
  }
}

export default ListAllUserEventResponsibleController;
