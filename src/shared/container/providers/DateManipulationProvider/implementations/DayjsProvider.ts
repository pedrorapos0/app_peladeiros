import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDateManipulationProvider from '@shared/container/providers/DateManipulationProvider/interfaces/IDateManipulationProvider';

dayjs.extend(utc);

class DayjsProvider implements IDateManipulationProvider {
  public diffBetweenDatesInHours(
    after_date: Date,
    before_date: Date,
    float = false,
  ): number {
    const after_date_utc = dayjs(after_date).utc().local().format();
    const before_date_utc = dayjs(before_date).utc().local().format();
    const diffInHours = dayjs(after_date_utc).diff(
      before_date_utc,
      'hours',
      float,
    );
    return diffInHours;
  }

  public getDayjsNow(): Date {
    return dayjs().toDate();
  }
  diffBetweenDatesInDays(
    after_date: Date,
    before_date: Date,
    float = false,
  ): number {
    const after_date_utc = dayjs(after_date).utc().local().format();
    const before_date_utc = dayjs(before_date).utc().local().format();
    const diffInDays = dayjs(after_date_utc).diff(
      before_date_utc,
      'days',
      float,
    );
    return diffInDays;
  }
  public addDateInDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  public addDateInHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  public compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export default DayjsProvider;
