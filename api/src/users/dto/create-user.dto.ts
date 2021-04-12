import { Role } from 'src/authentication/roles/role.enum';
export class CreateUserDto {
	readonly name: string;
	readonly username: string;
	readonly email: string;
	readonly userName: string;
	readonly password: string;
	readonly roles: Role[];
}
