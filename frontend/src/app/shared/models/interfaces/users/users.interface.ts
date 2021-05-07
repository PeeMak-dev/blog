import { Links } from '../links.interface';
import { Meta } from '../meta.interface';
import { User } from './user.interface';

export interface Users {
  docs: User[];
  meta: Meta;
  links?: Links;
}
