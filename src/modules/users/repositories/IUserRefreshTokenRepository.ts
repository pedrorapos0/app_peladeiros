import UserRefreshToken from '@modules/users/infra/typeorm/entites/UserRefreshToken';
import ICreateUserRefreshToken from '@modules/users/dtos/ICreateUserRefreshToken';

interface IUserRefreshTokenRepository {
  create(data: ICreateUserRefreshToken): Promise<UserRefreshToken>;
  findUserIdAndRefreshToken(
    refresh_token: string,
    user_id: string,
  ): Promise<UserRefreshToken | undefined>;
  delete(refreshToken_id: string): Promise<void>;
  findByRefreshToken(
    refresh_Token: string,
  ): Promise<UserRefreshToken | undefined>;
}

export default IUserRefreshTokenRepository;
