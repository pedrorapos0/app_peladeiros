import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserEventDTO from '@modules/user_event/dtos/ICreateUserEventDTO';
import AppError from '@shared/error/AppError';
import UserEvent from 'modules/user_event/infra/typeorm/entites/UserEvent';
import IUserEventRepository from 'modules/user_event/repositories/IUserEventRepository';

class CreateUserEventUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userEventRepository: IUserEventRepository,
  ) {
    this.userEventRepository = userEventRepository;
    this.userEventRepository = userEventRepository;
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

    if (!userExist) {
      throw new AppError('User not found!');
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
