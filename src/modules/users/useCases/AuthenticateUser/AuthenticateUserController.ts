import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserUseCase from '@modules/users/useCases/AuthenticateUser/AuthenticateUserUseCase';

class AuthenticateUserController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const authResponse = await authenticateUserUseCase.execute(email, password);

    return response.json(authResponse);
  }
}

export default AuthenticateUserController;
