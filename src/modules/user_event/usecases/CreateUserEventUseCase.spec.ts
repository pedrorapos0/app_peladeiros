import UserRefreshTokenRepositoryInmemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import CreateUserEventUseCase from '@modules/user_event/usecases/CreateUserEventUseCase';
import CreateUserEventInMemory from '@modules/user_event/infra/typeorm/repositories/CreateUserEventInMemory';

let userRepositoryInMemory: UserRefreshTokenRepositoryInmemory;
let createUserEventInMemory: CreateUserEventInMemory;
let createUserEventUseCase: CreateUserEventUseCase;

describe('Create use event', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRefreshTokenRepositoryInmemory.getInstance();
    createUserEventInMemory = CreateUserEventInMemory.getInstance();
    createUserEventUseCase = new CreateUserEventUseCase(
      userRepositoryInMemory,
      createUserEventInMemory,
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
      start_date: new Date('2022-03-23T 22:00:00'),
      end_date: new Date('2022-03-23T 23:00:00'),
      minimum_number_guests: 12,
      maximum_number_guests: 18,
    });

    expect(event).toHaveProperty('id');
  });
});
