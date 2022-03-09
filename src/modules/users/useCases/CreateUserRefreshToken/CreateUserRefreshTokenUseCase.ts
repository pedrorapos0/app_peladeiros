import { inject, injectable } from 'tsyringe';
import { verify, sign } from 'jsonwebtoken';
import IUserRefreshTokenRepository from '@modules/users/repositories/IUserRefreshTokenRepository';
import IDateManipulationProvider from '@shared/container/providers/DateManipulationProvider/interfaces/IDateManipulationProvider';
import auth from '@config/auth';
import AppError from '@shared/error/AppError';


interface Payload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  userRefreshToken: string;
}

@injectable()
class CreateUserRefreshTokenUseCase {
  constructor(
    @inject('UserRefreshTokenRepository')
    private userRefreshTokenRepository: IUserRefreshTokenRepository,
    @inject('DayjsProvider') private dayjsProvider: IDateManipulationProvider,
  ) {
    this.userRefreshTokenRepository = userRefreshTokenRepository;
    this.dayjsProvider = dayjsProvider;
  }

  public async execute(
    refreshtoken: string,
  ): Promise<IResponse> {
    const {
      secret_token,
      secret_refreshToken,
      expered_token,
      expered_refreshToken,
      expired_refresh_token_in_days,
    } = auth;

    const userRefreshTokenExist =
      await this.userRefreshTokenRepository.findByRefreshToken(
        refreshtoken,
      );

    if (!userRefreshTokenExist) {
      throw new AppError('Refresh token does not exist', 401);
    }
    let { email,sub: user_id } = verify(refreshtoken, secret_refreshToken) as Payload;

    const token = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expered_token,
    });

    await this.userRefreshTokenRepository.delete(userRefreshTokenExist.id);

    const refresh_token = sign({ email }, secret_refreshToken, {
      subject: user_id,
      expiresIn: expered_refreshToken,
    });

    const date_expiration = this.dayjsProvider.addDateInDays(
      expired_refresh_token_in_days,
    );

    const newUserRefreshToken = await this.userRefreshTokenRepository.create({
      refresh_token,
      user_id,
      date_expiration,
    });

    return {
      token,
      userRefreshToken: newUserRefreshToken.refresh_token,
    };
  }
}

export default CreateUserRefreshTokenUseCase;
