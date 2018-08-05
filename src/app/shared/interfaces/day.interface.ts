import { ISlot } from './slot.interface';

export interface IDay {
  slots: ISlot[];
  date: string;
  _id?: string;
}
