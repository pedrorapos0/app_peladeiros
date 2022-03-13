import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordUseCase from '@modules/users/useCases/ResetPassword/ResetPasswordUseCase';

class ResetPasswordController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const token = request.query.token as string;
    const { password } = request.body;
    const reserPassword = container.resolve(ResetPasswordUseCase);
    await reserPassword.execute(token, password);
    return response.status(201).send();
  }
}

export default ResetPasswordController;
