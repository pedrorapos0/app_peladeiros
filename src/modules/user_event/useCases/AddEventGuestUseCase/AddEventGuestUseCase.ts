import IUserRepository from '@modules/users/repositories/IUserRepository';
import IDateManipulationProvider from '@shared/container/providers/DateManipulationProvider/interfaces/IDateManipulationProvider';
import { inject, injectable } from 'tsyringe';
import IUserEventRepository from '../../repositories/IUserEventRepository';
import IAddEventGuestDTO from '@modules/user_event/dtos/IAddEventGuestDTO';
import AppError from '@shared/error/AppError';

@injectable()
class AddEventGuestUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserEventRepository')
    private userEventRepository: IUserEventRepository,
    @inject('DayjsProvider') private dayjsProvider: IDateManipulationProvider,
  ) {
    this.userRepository = userRepository;
    this.userEventRepository = userEventRepository;
    this.dayjsProvider = dayjsProvider;
  }

  public async execute({
    event_id,
    guest_id,
  }: IAddEventGuestDTO): Promise<void> {
    const eventExist = await this.userEventRepository.findById(event_id);
    if (!eventExist) {
      throw new AppError('Event not exist!');
    }

    const guestExist = await this.userRepository.findById(guest_id);
    if (!guestExist) {
      throw new AppError('Guest not exist!');
    }

    const isBeforeEvent = this.dayjsProvider.compareIfBefore(
      new Date(),
      new Date(eventExist.start_date),
    );

    if (!isBeforeEvent) {
      throw new AppError('event has already started!');
    }

    if (!eventExist.guests) {
      eventExist.guests = [];
    }
    eventExist.guests.push(guestExist);

    await this.userEventRepository.update(eventExist);
  }
}

export default AddEventGuestUseCase;
