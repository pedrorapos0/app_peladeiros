import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/implementations/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

export default container;
