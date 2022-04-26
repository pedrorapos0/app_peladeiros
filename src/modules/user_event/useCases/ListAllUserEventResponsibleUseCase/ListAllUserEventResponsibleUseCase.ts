import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserEvent from '@modules/user_event/infra/typeorm/entites/UserEvent';
import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAllUserEventResponsibleUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserEventRepository')
    private userEventRepository: IUserEventRepository,
  ) {
    this.userRepository = userRepository;
    this.userEventRepository = userEventRepository;
  }

  public async execute(responsible_id: string): Promise<UserEvent[]> {
    const responsibleEvents = await this.userEventRepository.findByResponsible(responsible_id);

    return responsibleEvents;
  }
}

export default ListAllUserEventResponsibleUseCase;
