import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string) {
		const user = await this.userService.findUserByEmail(email);

		if (user && (await bcrypt.compare(pass, user.password))) {
			return user;
		}
		return null;
	}

	async login(user: any) {
		const payload = {
			email: user.email,
			username: user.username,
			roles: user.roles,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
