import { inject, injectable } from 'tsyringe';
import IUserRefreshTokenRepository from '@modules/users/repositories/IUserRefreshTokenRepository';
import ICreateUserRefreshToken from '@modules/users/dtos/ICreateUserRefreshToken';

@injectable()
class CreateUserRefreshTokenUseCase {
  constructor(
    @inject('UserRefreshTokenRepository')
    private userRefreshTokenRepository: IUserRefreshTokenRepository,
  ) {
    this.userRefreshTokenRepository = userRefreshTokenRepository;
  }

  public async execute({
    refresh_token,
    user_id,
    date_expiration,
  }: ICreateUserRefreshToken): Promise<void> {
    await this.userRefreshTokenRepository.create({
      refresh_token,
      user_id,
      date_expiration,
    });
  }
}

export default CreateUserRefreshTokenUseCase;
