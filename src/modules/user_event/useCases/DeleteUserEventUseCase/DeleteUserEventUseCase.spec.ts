import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import UserEventRepositoryInMemory from '@modules/user_event/infra/typeorm/repositories/fakes/UserEventRepositoryInMemory';
import DeleteUserEventUseCase from '@modules/user_event/useCases/DeleteUserEventUseCase/DeleteUserEventUseCase';
import AppError from '@shared/error/AppError';

let deleteEventUseCase: DeleteUserEventUseCase;
let userEventRepository: UserEventRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Delete a UserEvent', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    userEventRepository = UserEventRepositoryInMemory.getInstance();
    deleteEventUseCase = new DeleteUserEventUseCase(userEventRepository);
  });

  it('should be able delete a userEvent', async () => {
    const deleted = jest.spyOn(userEventRepository, 'delete');

    const responsibleEvent = await userRepositoryInMemory.create({
      name: 'Ronald Maxwell',
      email: 'iga@pewapu.pm',
      birth_date: new Date('2000-02-14'),
      password: '769035',
    });
    const eventTest = await userEventRepository.create({
      title: 'Event test',
      start_date: new Date('2022-12-02 20:00:00'),
      end_date: new Date('2022-12-02 22:10:00'),
      responsible_id: responsibleEvent.id,
      minimum_number_guests: 15,
    });

    await deleteEventUseCase.execute(eventTest.id, responsibleEvent.id);

    expect(deleted).toBeCalled();
  });

  it('should not be able delete a userEvent non-exist', async () => {
    await expect(
      deleteEventUseCase.execute('event-no-exist', 'user-non-exist'),
    ).rejects.toEqual(new AppError('UserEvent not exist!'));
  });

  it('should not be able delete a userEvent non-exist', async () => {
    const eventTest = await userEventRepository.create({
      title: 'Event test2',
      start_date: new Date('2022-12-02 20:00:00'),
      end_date: new Date('2022-12-02 22:10:00'),
      responsible_id: '1234567',
      minimum_number_guests: 15,
    });

    await expect(
      deleteEventUseCase.execute(eventTest.id, 'user-non-exist'),
    ).rejects.toEqual(
      new AppError('Only the person responsible for can delete the event!'),
    );
  });
});
