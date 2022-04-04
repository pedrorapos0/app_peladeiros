import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserEventDTO from '@modules/user_event/dtos/ICreateUserEventDTO';
import IDateManipulationProvider from '@shared/container/providers/DateManipulationProvider/interfaces/IDateManipulationProvider';
import AppError from '@shared/error/AppError';
import UserEvent from 'modules/user_event/infra/typeorm/entites/UserEvent';
import IUserEventRepository from 'modules/user_event/repositories/IUserEventRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserEventUseCase {
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
    responsible_id,
    title,
    start_date,
    end_date,
    minimum_number_guests,
    maximum_number_guests,
  }: ICreateUserEventDTO): Promise<UserEvent> {
    const userExist = await this.userRepository.findById(responsible_id);
    const startDateMoreTwoHours = this.dayjsProvider.addHoursInDate(
      start_date,
      2,
    );

    if (!userExist) {
      throw new AppError('User not found!');
    }

    if (!this.dayjsProvider.compareIfBefore(new Date(), start_date)) {
      throw new AppError('the event cannot start before the current date!');
    }

    if (!this.dayjsProvider.compareIfAfter(end_date, startDateMoreTwoHours)) {
      throw new AppError(
        'the event must end at least two hour after the start event date!',
      );
    }

    const event = await this.userEventRepository.create({
      responsible_id,
      title,
      start_date,
      end_date,
      minimum_number_guests,
      maximum_number_guests,
    });

    return event;
  }
}

export default CreateUserEventUseCase;
