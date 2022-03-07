import ICreateUserRefreshToken from '@modules/users/dtos/ICreateUserRefreshToken';
import IUserRefreshTokenRepository from '@modules/users/repositories/IUserRefreshTokenRepository';
import UserRefreshToken from '@modules/users/infra/typeorm/entites/UserRefreshToken';

class UserRefreshTokenRepositoryInmemory
  implements IUserRefreshTokenRepository
{
  private usersRefreshRepository: UserRefreshToken[] = [];
  private static instance: UserRefreshTokenRepositoryInmemory | undefined;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserRefreshTokenRepositoryInmemory();
      return this.instance;
    }
    return this.instance;
  }

  public async create({
    refresh_token,
    user_id,
    date_expiration,
  }: ICreateUserRefreshToken): Promise<UserRefreshToken> {
    const useRefreshToken = new UserRefreshToken();
    Object.assign(useRefreshToken, { refresh_token, user_id, date_expiration });
    this.usersRefreshRepository.push(useRefreshToken);
    return useRefreshToken;
  }
  public async findUserIdAndRefreshToken(
    refresh_token: string,
    user_id: string,
  ): Promise<UserRefreshToken | undefined> {
    const userRefreshToken = this.usersRefreshRepository.find(
      refreshToken =>
        refreshToken.user_id === user_id &&
        refreshToken.refresh_token === refresh_token,
    );

    return userRefreshToken;
  }
  public async delete(refreshToken_id: string): Promise<void> {
    const userRefreshTokenIndex = this.usersRefreshRepository.findIndex(
      refreshToken => refreshToken.id === refreshToken_id,
    );

    this.usersRefreshRepository.splice(userRefreshTokenIndex, 1);
  }
  public async findByRefreshToken(
    refresh_Token: string,
  ): Promise<UserRefreshToken | undefined> {
    const userRefreshToken = this.usersRefreshRepository.find(
      refreshToken => refreshToken.refresh_token === refresh_Token,
    );
    return userRefreshToken;
  }
}

export default UserRefreshTokenRepositoryInmemory;
