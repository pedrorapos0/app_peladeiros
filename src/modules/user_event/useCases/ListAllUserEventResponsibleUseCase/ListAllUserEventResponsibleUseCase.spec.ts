import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import UserEventRepositoryInMemory from '@modules/user_event/infra/typeorm/repositories/fakes/UserEventRepositoryInMemory';
import ListAllUserEventResponsibleUseCase from '@modules/user_event/useCases/ListAllUserEventResponsibleUseCase/ListAllUserEventResponsibleUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let userEventRepositoryInMemory: UserEventRepositoryInMemory;
let listAllUserEventResponsibleUseCase: ListAllUserEventResponsibleUseCase;

describe('list all user events of an responsible', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    userEventRepositoryInMemory = UserEventRepositoryInMemory.getInstance();
    listAllUserEventResponsibleUseCase = new ListAllUserEventResponsibleUseCase(
      userRepositoryInMemory,
      userEventRepositoryInMemory,
    );
  });

  it('Should be to able list all user events of an responsible', async () => {
    const responsible = await userRepositoryInMemory.create({
      name: 'Mayme Holmes',
      email: 'vihkuujo@budhatha.mg',
      birth_date: new Date('1989-05-06'),
      password: '633066',
    });

    const event1 = await userEventRepositoryInMemory.create({
      title: 'event test1',
      start_date: new Date('2022-12-02 20:00:00'),
      end_date: new Date('2022-12-02 23:00:00'),
      minimum_number_guests: 20,
      responsible_id: responsible.id,
    });

    const event2 = await userEventRepositoryInMemory.create({
      title: 'event test2',
      start_date: new Date('2022-12-09 20:00:00'),
      end_date: new Date('2022-12-09 23:00:00'),
      minimum_number_guests: 20,
      responsible_id: responsible.id,
    });

    const lisEvents = await listAllUserEventResponsibleUseCase.execute(
      responsible.id,
    );

    expect(lisEvents).toEqual(expect.arrayContaining([event1, event2]));
  });
});
