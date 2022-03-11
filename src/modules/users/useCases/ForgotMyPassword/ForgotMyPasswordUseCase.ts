import auth from '@config/auth';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import AppError from '@shared/error/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
class ForgotMyPasswordUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
  ) {
    this.userRepository = userRepository;
  }

  public async execute(email: string): Promise<void> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('Email not registered!');
    }

    const { secret_token, expered_token } = auth;
    const jtwToken = sign({}, secret_token, {
      subject: userExist.id,
      expiresIn: expered_token,
    });

    const [, token] = jtwToken.split('.');

    await this.mailProvider.sendMailProvider({
      to: userExist.email,
      subject: 'Recuperação de Senha',
      from: 'App Peladeiro<noreply@peladeiro.com>',
      text: `Clique no link para resetar a senha http://localhost:3333?token=${token}`,
    });
  }
}

export default ForgotMyPasswordUseCase;
