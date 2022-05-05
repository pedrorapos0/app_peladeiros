import UserRefreshTokenRepositoryInmemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import CreateUserEventUseCase from '@modules/user_event/useCases/CreateUserEventUseCase/CreateUserEventUseCase';
import UserEventRepositoryInMemory from '@modules/user_event/infra/typeorm/repositories/fakes/UserEventRepositoryInMemory';
import DayjsProvider from '@shared/container/providers/DateManipulationProvider/implementations/DayjsProvider';
import AppError from '@shared/error/AppError';

let userRepositoryInMemory: UserRefreshTokenRepositoryInmemory;
let createUserEventInMemory: UserEventRepositoryInMemory;
let createUserEventUseCase: CreateUserEventUseCase;
let dayjsProvider: DayjsProvider;

describe('Create use event', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRefreshTokenRepositoryInmemory.getInstance();
    createUserEventInMemory = UserEventRepositoryInMemory.getInstance();
    dayjsProvider = new DayjsProvider();
    createUserEventUseCase = new CreateUserEventUseCase(
      userRepositoryInMemory,
      createUserEventInMemory,
      dayjsProvider,
    );
  });

  it('should be able to create a new user event', async () => {
    const eventResponsible = await userRepositoryInMemory.create({
      name: 'Myrtle Franklin',
      email: 'mehavot@bizi.lc',
      password: '123456',
      birth_date: new Date('2001-10-23'),
    });

    const event = await createUserEventUseCase.execute({
      title: 'Event Test',
      responsible_id: eventResponsible.id,
      start_date: new Date('2022-12-23 20:00:00'),
      end_date: new Date('2022-12-23 23:00:00'),
      minimum_number_guests: 12,
      maximum_number_guests: 18,
    });

    expect(event).toHaveProperty('id');
  });

  it('Should not be able to create a new user event for a non-existent responsible', async () => {
    await expect(
      createUserEventUseCase.execute({
        title: 'Event Test',
        responsible_id: 'non-exist',
        start_date: new Date('2022-12-23 20:00:00'),
        end_date: new Date('2022-12-23 23:00:00'),
        minimum_number_guests: 12,
        maximum_number_guests: 18,
      }),
    ).rejects.toEqual(new AppError('User not found!'));
  });
});
