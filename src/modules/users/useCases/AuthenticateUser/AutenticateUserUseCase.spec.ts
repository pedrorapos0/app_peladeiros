import UserRepositoryInMemory from '@modules/users/infra/typeorm/repositories/fakes/UserRepositoryInMemory';
import AutenticateUserUseCase from '@modules/users/useCases/AuthenticateUser/AutenticateUserUseCase';

let userRepository: UserRepositoryInMemory;
let autenticateUserUseCase: AutenticateUserUseCase;

describe('Autenticate user', () => {
  beforeEach(() => {
    userRepository = UserRepositoryInMemory.getInstance();
    autenticateUserUseCase = new AutenticateUserUseCase(userRepository);
  });

  it('Should be able to autenticate a user', async () => {
    const request = { email: 'test@example.com', password: '123456' };
    const { email, password } = request;
    const response = await autenticateUserUseCase.execute(email, password);

    expect(response).toHaveProperty('token');
  });
});
