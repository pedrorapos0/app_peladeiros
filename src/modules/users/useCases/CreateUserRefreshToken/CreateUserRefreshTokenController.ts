import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserRefreshTokenUseCase from '@modules/users/useCases/CreateUserRefreshToken/CreateUserRefreshTokenUseCase';
class CreateUserRefreshTokenController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user;
    const { userRefreshtoken } = request.params;

    const createUserRefreshTokenUserCase = container.resolve(
      CreateUserRefreshTokenUseCase,
    );

    const newrefresh = await createUserRefreshTokenUserCase.execute(
      userRefreshtoken,
      user_id,
    );

    return response.json(newrefresh);
  }
}

export default CreateUserRefreshTokenController;
