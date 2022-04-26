import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteUserEventUseCase {
  constructor(
    @inject('UserEventRepository')
    private userEventRepository: IUserEventRepository,
  ) {
    this.userEventRepository = userEventRepository;
  }

  public async execute(
    userEvent_id: string,
    responsible_id: string,
  ): Promise<void> {
    const userEventExist = await this.userEventRepository.findById(
      userEvent_id,
    );

    if (!userEventExist) {
      throw new AppError('UserEvent not exist!');
    }

    if (userEventExist.responsible_id !== responsible_id) {
      throw new AppError(
        'Only the person responsible for can delete the event!',
      );
    }

    await this.userEventRepository.delete(userEvent_id, responsible_id);
  }
}

export default DeleteUserEventUseCase;
