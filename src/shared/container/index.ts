import { container } from 'tsyringe';

import '@shared/container/providers/';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserEventRepository from '@modules/user_event/repositories/IUserEventRepository';
import IUserRefreshTokenRepository from '@modules/users/repositories/IUserRefreshTokenRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/implementations/UserRepository';
import UserEventRepository from '@modules/user_event/infra/typeorm/repositories/implementations/UserEventRepository';
import UserRefreshTokenRepository from '@modules/users/infra/typeorm/repositories/implementations/UserRefreshTokenRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserEventRepository>(
  'UserEventRepository',
  UserEventRepository,
);
container.registerSingleton<IUserRefreshTokenRepository>(
  'UserRefreshTokenRepository',
  UserRefreshTokenRepository,
);

export default container;
