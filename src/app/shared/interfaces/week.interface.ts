import { IDay } from './day.interface';

export interface IWeek {
  endDate: string;
  startDate: string;
  days: IDay[];
}
