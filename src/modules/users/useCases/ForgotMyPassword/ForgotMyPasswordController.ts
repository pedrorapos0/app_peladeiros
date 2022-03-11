import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ForgotMyPasswordUseCase from '@modules/users/useCases/ForgotMyPassword/ForgotMyPasswordUseCase';

class ForgotMyPasswordController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;
    const forgotMyPasswordUseCase = container.resolve(ForgotMyPasswordUseCase);
    await forgotMyPasswordUseCase.execute(email);
    return response.status(201).send();
  }
}

export default ForgotMyPasswordController;
