import ICreateUserEventDTO from '@modules/user_event/dtos/ICreateUserEventDTO';
import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import UserEvent from '../entites/UserEvent';

class CreateUserEventInMemory implements IUserEventRepository {
  private userEvents: UserEvent[] = [];

  private static instance: CreateUserEventInMemory | undefined;

  public static getInstance(): CreateUserEventInMemory {
    if (!this.instance) {
      this.instance = new CreateUserEventInMemory();
    }

    return this.instance;
  }

  public async create({
    responsible_id,
    title,
    start_date,
    end_date,
    minimum_number_guests,
    maximum_number_guests,
  }: ICreateUserEventDTO): Promise<UserEvent> {
    const userEvent = new UserEvent();
    Object.assign(userEvent, {
      responsible_id,
      title,
      start_date,
      end_date,
      minimum_number_guests,
      maximum_number_guests,
    });

    this.userEvents.push(userEvent);

    return userEvent;
  }
}

export default CreateUserEventInMemory;
