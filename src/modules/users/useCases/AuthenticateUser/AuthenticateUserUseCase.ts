import IUserRepository from '@modules/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import auth from '@config/auth';

import AppError from '@shared/error/AppError';
import IUserRefreshTokenRepository from '@modules/users/repositories/IUserRefreshTokenRepository';
import IDateManipulationProvider from '@shared/container/providers/DateManipulationProvider/interfaces/IDateManipulationProvider';

interface IResponse {
  user: {
    name: string;
    email: string;
  };

  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserRefreshTokenRepository')
    private userRefreshTokenRepository: IUserRefreshTokenRepository,
    @inject('DayjsProvider') private dayjsProvider: IDateManipulationProvider,
  ) {
    this.userRepository = userRepository;
    this.userRefreshTokenRepository = userRefreshTokenRepository;
    this.dayjsProvider = dayjsProvider;
  }

  public async execute(email: string, password: string): Promise<IResponse> {
    const {
      secret_token,
      secret_refreshToken,
      expered_token,
      expered_refreshToken,
      expired_refresh_token_in_days,
    } = auth;
    const userExist = await this.userRepository.findByEmail(email);
    if (!userExist) {
      throw new AppError('email or password incorrect!', 404);
    }

    const passwordCompare = await compare(password, userExist.password);

    if (!passwordCompare) {
      throw new AppError('email or password incorrect!', 404);
    }

    const token = sign({}, secret_token, {
      subject: userExist.id,
      expiresIn: expered_token,
    });

    const refresh_token = sign({ email }, secret_refreshToken, {
      subject: userExist.id,
      expiresIn: expered_refreshToken,
    });

    const date_expiration = this.dayjsProvider.addDateInDays(
      expired_refresh_token_in_days,
    );

    const userContainsRefreshToken =
      await this.userRefreshTokenRepository.findUserId(userExist.id);

    if (userContainsRefreshToken) {
      await this.userRefreshTokenRepository.delete(userContainsRefreshToken.id);
    }

    await this.userRefreshTokenRepository.create({
      refresh_token,
      user_id: userExist.id,
      date_expiration,
    });

    return {
      user: {
        name: userExist.name,
        email,
      },
      token,
      refresh_token,
    };
  }
}

export default AuthenticateUserUseCase;
