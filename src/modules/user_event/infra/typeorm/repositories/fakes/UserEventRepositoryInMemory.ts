import User from '@modules/users/infra/typeorm/entites/User';
import ICreateUserEventDTO from '@modules/user_event/dtos/ICreateUserEventDTO';
import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import UserEvent from '../../entites/UserEvent';

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

  public async findById(event_id: string): Promise<UserEvent | undefined> {
    const eventExist = this.userEvents.find(event => event.id === event_id);
    return eventExist;
  }

  public async update(changedEvent: UserEvent): Promise<UserEvent> {
    const eventIndex = this.userEvents.findIndex(
      event => event.id === changedEvent.id,
    );
    this.userEvents[eventIndex] = changedEvent;

    return changedEvent;
  }
  public async listAllGuest(event_id: string): Promise<User[] | undefined> {
    const event = this.userEvents.find(event => event.id === event_id);
    const guests = event?.guests;
    return guests;
  }

  public async delete(event_id: string, responsible_id: string): Promise<void> {
    const eventIndex = this.userEvents.findIndex(
      event => event.id === event_id && responsible_id === responsible_id,
    );
    this.userEvents.splice(eventIndex, 1);
  }
  public async findByResponsible(responsible_id: string): Promise<UserEvent[]> {
    const eventsResponsible = this.userEvents.filter(
      event => event.responsible_id === responsible_id,
    );
    return eventsResponsible;
  }
}

export default CreateUserEventInMemory;
