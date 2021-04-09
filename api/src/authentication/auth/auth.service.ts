import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string) {
		const user = await this.userService.findUserByEmail(email);

		if (user && user.password === pass) {
			return user;
		}
		return null;
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.userName };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
