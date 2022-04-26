import User from '@modules/users/infra/typeorm/entites/User';
import UserEvent from '@modules/user_event/infra/typeorm/entites/UserEvent';
import ICreateUserEventDTO from '../dtos/ICreateUserEventDTO';

interface IUserEventRepository {
  create(data: ICreateUserEventDTO): Promise<UserEvent>;
  findById(event_id: string): Promise<UserEvent | undefined>;
  findByResponsible(responsible_id: string): Promise<UserEvent[]>;
  update(changedEvent: UserEvent): Promise<UserEvent>;
  listAllGuest(event_id: string): Promise<User[] | undefined>;
  delete(event_id: string, responsible_id: string): Promise<void>;
}

export default IUserEventRepository;
