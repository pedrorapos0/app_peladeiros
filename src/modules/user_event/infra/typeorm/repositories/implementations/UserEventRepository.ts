import ICreateUserEventDTO from '@modules/user_event/dtos/ICreateUserEventDTO';
import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import { getRepository, Repository } from 'typeorm';
import UserEvent from '@modules/user_event/infra/typeorm/entites/UserEvent';
import User from '@modules/users/infra/typeorm/entites/User';

class UserEventRepository implements IUserEventRepository {
  private userEventRepository: Repository<UserEvent>;
  constructor() {
    this.userEventRepository = getRepository(UserEvent);
  }

  public async create({
    responsible_id,
    title,
    start_date,
    end_date,
    minimum_number_guests,
    maximum_number_guests,
  }: ICreateUserEventDTO): Promise<UserEvent> {
    const userEvent = this.userEventRepository.create({
      responsible_id,
      title,
      start_date,
      end_date,
      minimum_number_guests,
      maximum_number_guests,
    });
    await this.userEventRepository.save(userEvent);
    return userEvent;
  }

  public async findById(event_id: string): Promise<UserEvent | undefined> {
    const userEvent = await this.userEventRepository.findOne(event_id);
    return userEvent;
  }
  public async update(changedEvent: UserEvent): Promise<UserEvent> {
    await this.userEventRepository.save(changedEvent);
    return changedEvent;
  }

  public async listAllGuest(event_id: string): Promise<User[] | undefined> {
    const event = await this.userEventRepository.findOne(event_id, {
      relations: ['guests'],
    });

    const guests = event?.guests;

    return guests;
  }

  public async delete(event_id: string, responsible_id: string): Promise<void> {
    await this.userEventRepository.delete(event_id);
  }

  public async findByResponsible(responsible_id: string): Promise<UserEvent[]> {
    const eventsResponsible = await this.userEventRepository.find({
      where: {
        responsible_id,
      },
      relations: ['responsible'],
    });

    return eventsResponsible;
  }
}

export default UserEventRepository;
