import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import UserEventRepository from '@modules/user_event/infra/typeorm/repositories/fakes/UserEventRepositoryInMemory';
import ListAllEventGuestsUseCase from '@modules/user_event/useCases/ListAllEventGuestsUseCase/ListAllEventGuestsUseCase';
import AppError from '@shared/error/AppError';

let userRepository: UserRepositoryInMemory;
let userEventRepository: UserEventRepository;
let listAllEventGuests: ListAllEventGuestsUseCase;

describe('List all event guests', () => {
  beforeEach(() => {
    userRepository = UserRepositoryInMemory.getInstance();
    userEventRepository = UserEventRepository.getInstance();
    listAllEventGuests = new ListAllEventGuestsUseCase(userEventRepository);
  });

  it('Should be able to list all event guests', async () => {
    const guest1 = await userRepository.create({
      name: 'Vernon Collins',
      email: 'ra@fom.kh',
      password: '819606',
      birth_date: new Date('1993-08-28'),
    });
    const guest2 = await userRepository.create({
      name: 'Charlotte Jordan',
      email: 'foekeehi@ropote.pa',
      password: '027509',
      birth_date: new Date('1988-12-28'),
    });
    const event = await userEventRepository.create({
      title: 'racha',
      minimum_number_guests: 10,
      maximum_number_guests: 20,
      start_date: new Date('2022-05-01 20:00:00'),
      end_date: new Date('2022-05-01 22:10:00'),
      responsible_id: guest1.id,
    });

    event.guests = [];
    event.guests.push(guest1),
      event.guests.push(guest2),
      await userEventRepository.update(event);

    const guests = await listAllEventGuests.execute(event.id);

    expect(guests).toEqual(expect.arrayContaining([guest1, guest2]));
  });

  it('Should not be able to list guests for a non-existing event', async () => {
    await expect(listAllEventGuests.execute('non-exist_event')).rejects.toEqual(
      new AppError('Event not found!'),
    );
  });
});
