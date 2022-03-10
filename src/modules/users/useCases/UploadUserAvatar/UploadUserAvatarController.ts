import { Request, Response } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import UploadUserAvatarUseCase from '@modules/users/useCases/UploadUserAvatar/UploadUserAvatarUseCase';

class UploadUserAvatarController {
  public async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { file } = request;
    const { id: user_id } = request.user;
    const uploadUserAvatarUseCase = container.resolve(UploadUserAvatarUseCase);
    const user = await uploadUserAvatarUseCase.execute({
      avatar_user: file?.filename,
      user_id,
    });
    return response.json(user);
  }
}

export default UploadUserAvatarController;
