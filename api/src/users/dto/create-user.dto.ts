import { IsEmail, IsString } from 'class-validator';
import { Role } from 'src/authentication/roles/role.enum';
export class CreateUserDto {
	@IsString()
	readonly name: string;

	@IsString()
	readonly username: string;

	@IsEmail()
	readonly email: string;

	@IsString()
	readonly password: string;

	readonly roles: Role[];
}
