import User from '@modules/users/infra/typeorm/entites/User';
import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAllEventGuests {
  constructor(
    @inject('UserEventRepository')
    private userEventRepository: IUserEventRepository,
  ) {
    this.userEventRepository = userEventRepository;
  }

  public async execute(event_id: string): Promise<User[]> {
    const eventExist = await this.userEventRepository.listAllGuest(event_id);
    if (!eventExist) {
      throw new AppError('Event not found!');
    }

    return eventExist;
  }
}

export default ListAllEventGuests;
