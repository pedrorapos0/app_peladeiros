import IUserRefreshTokenRepository from '@modules/users/repositories/IUserRefreshTokenRepository';
import { getRepository, Repository } from 'typeorm';
import UserRefreshToken from '@modules/users/infra/typeorm/entites/UserRefreshToken';
import ICreateUserRefreshToken from '@modules/users/dtos/ICreateUserRefreshToken';

class UserRefreshTokenRepository implements IUserRefreshTokenRepository {
  private userRefreshTokenRepository: Repository<UserRefreshToken>;

  constructor() {
    this.userRefreshTokenRepository = getRepository(UserRefreshToken);
  }
  public async create({
    refresh_token,
    user_id,
    date_expiration,
  }: ICreateUserRefreshToken): Promise<UserRefreshToken> {
    const newRefreshToken = this.userRefreshTokenRepository.create({
      refresh_token,
      user_id,
      date_expiration,
    });
    this.userRefreshTokenRepository.save(newRefreshToken);
    return newRefreshToken;
  }
  public async findUserIdAndRefreshToken(
    refresh_token: string,
    user_id: string,
  ): Promise<UserRefreshToken | undefined> {
    const refreshToken = await this.userRefreshTokenRepository.findOne({
      where: { refresh_token, user_id },
    });

    return refreshToken;
  }
  public async delete(refreshToken_id: string): Promise<void> {
    await this.userRefreshTokenRepository.delete(refreshToken_id);
  }

  public async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserRefreshToken | undefined> {
    const refreshToken = await this.userRefreshTokenRepository.findOne({
      refresh_token,
    });

    return refreshToken;
  }
}

export default UserRefreshTokenRepository;
