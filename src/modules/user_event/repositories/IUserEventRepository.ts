import UserEvent from '@modules/user_event/infra/typeorm/entites/UserEvent';
import ICreateUserEventDTO from '../dtos/ICreateUserEventDTO';

interface IUserEventRepository {
  create(data: ICreateUserEventDTO): Promise<UserEvent>;
}

export default IUserEventRepository;
