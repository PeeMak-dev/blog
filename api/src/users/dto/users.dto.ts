import { Meta } from 'src/models/meta.interface';
import { User } from '../schema/user.schema';

export class Users {
	constructor(partial: Partial<Users>) {
		Object.assign(this, partial);
	}

	docs?: User[];
	meta: Meta;
}
