import { container } from 'tsyringe';

import '@shared/container/providers/';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserRefreshTokenRepository from '@modules/users/repositories/IUserRefreshTokenRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/implementations/UserRepository';
import UserRefreshTokenRepository from '@modules/users/infra/typeorm/repositories/implementations/UserRefreshTokenRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserRefreshTokenRepository>(
  'UserRefreshTokenRepository',
  UserRefreshTokenRepository,
);

export default container;
