import { container } from 'tsyringe';

import IDateManipulationProvider from '@shared/container/providers/DateManipulationProvider/interfaces/IDateManipulationProvider';
import DayjsProvider from '@shared/container/providers/DateManipulationProvider/implementations/DayjsProvider';

container.registerSingleton<IDateManipulationProvider>(
  'DayjsProvider',
  DayjsProvider,
);

export default container;
