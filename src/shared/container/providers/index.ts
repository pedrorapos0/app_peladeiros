import { container } from 'tsyringe';

import IDateManipulationProvider from '@shared/container/providers/DateManipulationProvider/interfaces/IDateManipulationProvider';
import DayjsProvider from '@shared/container/providers/DateManipulationProvider/implementations/DayjsProvider';

import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import IHashProvider from '@shared/container/providers/HashProvider/interfaces/IHashProvider';
import BcryptjsHashProvider from '@shared/container/providers/HashProvider/implementations/BcryptjsHashProvider';

container.registerSingleton<IDateManipulationProvider>(
  'DayjsProvider',
  DayjsProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BcryptjsHashProvider,
);

export default container;
