import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService) {}

	async validateUser(email: string, pass: string) {
		const user = await this.userService.findUserByEmail(email);

		if (user && user.password === pass) {
			return user;
		}
		return null;
	}
}
