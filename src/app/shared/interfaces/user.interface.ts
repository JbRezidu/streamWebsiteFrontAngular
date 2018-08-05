import { ROLES } from '../enums/roles.enum';

export interface IUser {
  pseudo: string;
  color: string;
  roles?: ROLES[];
}
