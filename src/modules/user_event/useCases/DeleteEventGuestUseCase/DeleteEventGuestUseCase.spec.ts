import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import UserEventRepositoryInMemory from '@modules/user_event/infra/typeorm/repositories/fakes/UserEventRepositoryInMemory';
import DeleteEventGuestUseCase from '@modules/user_event/useCases/DeleteEventGuestUseCase/DeleteEventGuestUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let userEventRepositoryInMemory: UserEventRepositoryInMemory;
let deleteEventGuestUseCase: DeleteEventGuestUseCase;
describe('Delete event guest', () => {
  userRepositoryInMemory = UserRepositoryInMemory.getInstance();
  userEventRepositoryInMemory = UserEventRepositoryInMemory.getInstance();
  deleteEventGuestUseCase = new DeleteEventGuestUseCase(
    userRepositoryInMemory,
    userEventRepositoryInMemory,
  );
});

it('should be able delete a guest user', async () => {
  const guest1 = await userRepositoryInMemory.create({
    name: 'Celia Ferguson',
    email: 'ite@riehu.cv',
    birth_date: new Date('1999-01-18'),
    password: '907860',
  });
  const guest2 = await userRepositoryInMemory.create({
    name: 'Katherine Howard',
    email: 'rodjume@jec.cw',
    birth_date: new Date('1993-10-21'),
    password: '421017',
  });

  const event = await userEventRepositoryInMemory.create({
    title: 'event test1',
    start_date: new Date('2022-06-01 20:00:00'),
    end_date: new Date('2022-06-01 23:00:00'),
    minimum_number_guests: 15,
    responsible_id: guest1.id,
  });

  event.guests = [];
  event.guests.push(guest1, guest2);

  await deleteEventGuestUseCase.execute(guest1.id, event.id);

  expect(event.guests).toEqual(expect.arrayContaining([guest2]));
});
