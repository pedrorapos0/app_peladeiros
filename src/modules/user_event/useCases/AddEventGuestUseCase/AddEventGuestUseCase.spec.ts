import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import AddEventGuestUseCase from '@modules/user_event/useCases/AddEventGuestUseCase/AddEventGuestUseCase';
import UserEventRepositoryInMemory from '@modules/user_event/infra/typeorm/repositories/fakes/UserEventRepositoryInMemory';
import DayjsProvider from '@shared/container/providers/DateManipulationProvider/implementations/DayjsProvider';
import AppError from '@shared/error/AppError';

let userRepositoryInMemory: UserRepositoryInMemory;
let userEventRepositoryInMemory: UserEventRepositoryInMemory;
let dayjsProvider: DayjsProvider;
let addEventGuestUseCase: AddEventGuestUseCase;

describe('Add event guest', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    userEventRepositoryInMemory = UserEventRepositoryInMemory.getInstance();
    dayjsProvider = new DayjsProvider();
    addEventGuestUseCase = new AddEventGuestUseCase(
      userRepositoryInMemory,
      userEventRepositoryInMemory,
      dayjsProvider,
    );
  });

  it('Should be able to add a guest to an event', async () => {
    const guest = await userRepositoryInMemory.create({
      name: 'Eleanor Keller',
      email: 'zidlotpem@mojkal.is',
      password: '478440',
      birth_date: new Date('1996-05-17'),
    });
    const event_responsabile = await userRepositoryInMemory.create({
      name: 'Ruth Henderson',
      email: 'iriwu@noafro.mg',
      password: '322052',
      birth_date: new Date('1998-02-05'),
    });

    const newEvent = await userEventRepositoryInMemory.create({
      title: 'event test',
      start_date: new Date('2022-12-27 22:00:00'),
      end_date: new Date('2022-12-24 23:00:00'),
      minimum_number_guests: 12,
      maximum_number_guests: 20,
      responsible_id: event_responsabile.id,
    });

    await addEventGuestUseCase.execute({
      event_id: newEvent.id,
      guest_id: guest.id,
    });

    expect(newEvent.guests).toEqual(expect.arrayContaining([guest]));
  });

  it('Should not be able to add a guest to an event not-exist', async () => {
    await expect(
      addEventGuestUseCase.execute({
        event_id: 'non-exist',
        guest_id: 'non-exist',
      }),
    ).rejects.toEqual(new AppError('Event not exist!'));
  });

  it('Should not be able to add a guest to an event not-exist', async () => {
    const event_responsabile = await userRepositoryInMemory.create({
      name: 'Barry Clark',
      email: 'joffo@evnalwah.tp',
      password: '296332',
      birth_date: new Date('1992-10-12'),
    });

    const newEvent = await userEventRepositoryInMemory.create({
      title: 'event test',
      start_date: new Date('2022-12-28 22:00:00'),
      end_date: new Date('2022-12-28 23:00:00'),
      minimum_number_guests: 16,
      maximum_number_guests: 24,
      responsible_id: event_responsabile.id,
    });
    await expect(
      addEventGuestUseCase.execute({
        event_id: newEvent.id,
        guest_id: 'non-exist',
      }),
    ).rejects.toEqual(new AppError('Guest not exist!'));
  });

  it('Should not be possible to add a guest to a started event', async () => {
    const guest = await userRepositoryInMemory.create({
      name: 'Maggie Lambert',
      email: 'semeko@azgoh.ve',
      password: '723943',
      birth_date: new Date('2001-01-06'),
    });

    const event_responsabile = await userRepositoryInMemory.create({
      name: 'Cornelia Roberts',
      email: 'etizob@up.nz',
      password: '145336',
      birth_date: new Date('1997-08-07'),
    });

    const newEvent = await userEventRepositoryInMemory.create({
      title: 'event test',
      start_date: new Date('2022-04-26 19:00:00'),
      end_date: new Date('2022-04-26 21:00:00'),
      minimum_number_guests: 15,
      maximum_number_guests: 20,
      responsible_id: event_responsabile.id,
    });
    await expect(
      addEventGuestUseCase.execute({
        event_id: newEvent.id,
        guest_id: guest.id,
      }),
    ).rejects.toEqual(new AppError('event has already started!'));
  });
});
