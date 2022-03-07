interface IDateManipulationProvider {
  diffBetweenDatesInHours(after_date: Date, before_date: Date): number;
  diffBetweenDatesInDays(after_date: Date, before_date: Date): number;
  getDayjsNow(): Date;
  addDateInDays(days: number): Date;
  addDateInHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export default IDateManipulationProvider;
