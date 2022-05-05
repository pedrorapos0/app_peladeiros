import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteEventGuestUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserEventRepository')
    private userEventRepository: IUserEventRepository,
  ) {
    this.userRepository = userRepository;
    this.userEventRepository = userEventRepository;
  }

  public async execute(guest_id: string, event_id: string): Promise<void> {
    const userExist = await this.userRepository.findById(guest_id);
    if (!userExist) {
      throw new AppError('User not exist!');
    }
    const eventExist = await this.userEventRepository.findById(event_id);
    if (!eventExist) {
      throw new AppError('Event not exist!');
    }

    const listGuest = eventExist.guests.filter(guest => guest.id !== guest_id);

    eventExist.guests = listGuest;

    await this.userEventRepository.update(eventExist);
  }
}

export default DeleteEventGuestUseCase;
