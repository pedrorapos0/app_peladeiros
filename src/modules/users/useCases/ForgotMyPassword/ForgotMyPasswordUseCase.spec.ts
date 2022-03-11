import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import ForgotMyPasswordUseCase from '@modules/users/useCases/ForgotMyPassword/ForgotMyPasswordUseCase';
import MailProviderFake from '@shared/container/providers/MailProvider/fakes/MailProviderFake';
import AppError from '@shared/error/AppError';

let userRepositoryInMemory: UserRepositoryInMemory;
let forgotMyPasswordUseCase: ForgotMyPasswordUseCase;
let mailProviderFake: MailProviderFake;

describe('Forgot my password', () => {
  beforeEach(() => {
    userRepositoryInMemory = UserRepositoryInMemory.getInstance();
    mailProviderFake = new MailProviderFake();
    forgotMyPasswordUseCase = new ForgotMyPasswordUseCase(
      userRepositoryInMemory,
      mailProviderFake,
    );
  });

  it('Should be able to recover forgotten password', async () => {
    const sendMail = jest.spyOn(mailProviderFake, 'sendMailProvider');
    await userRepositoryInMemory.create({
      name: 'Teste',
      email: 'test@mail.com',
      birth_date: new Date('01/01/1990'),
      password: '123456',
    });
    await forgotMyPasswordUseCase.execute('test@mail.com');
    expect(sendMail).toBeCalled();
  });
  it('Should not be able to recover forgotten password to a email non-existent', async () => {
    await expect(
      forgotMyPasswordUseCase.execute('non-exits@mail.com'),
    ).rejects.toEqual(new AppError('Email not registered!'));
  });
});
