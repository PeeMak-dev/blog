import { Role } from '../../enums/roles.enum';

export interface User {
  name: string;
  email: string;
  username: string;
  roles: Role[];
}
