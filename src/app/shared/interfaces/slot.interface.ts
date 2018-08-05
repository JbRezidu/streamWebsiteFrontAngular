import { IUser } from './user.interface';

export interface ISlot {
  streamer: IUser;
  startHour: number;
  duration: number;
  tilte: string;
  description: string;
  _id?: string;
}
