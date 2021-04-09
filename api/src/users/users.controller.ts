import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return new User({
			...JSON.parse(
				JSON.stringify(await this.usersService.createUser(createUserDto)),
			),
		});
	}

	@Get()
	async findAllUsers(): Promise<User[]> {
		const users = await this.usersService.findAllUsers();

		return users.map(
			(user) => new User({ ...JSON.parse(JSON.stringify(user)) }),
		);
	}

	@Get(':id')
	async findUser(@Param('id') id: string): Promise<User> {
		const user = await this.usersService.findUser(id);

		return new User({
			...JSON.parse(JSON.stringify(user)),
		});
	}

	@Patch(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		const newUser = await this.usersService.updateUser(id, updateUserDto);

		return new User({
			...JSON.parse(JSON.stringify(newUser)),
		});
	}

	@Delete(':id')
	async removeUser(@Param('id') id: string): Promise<User> {
		return new User({
			...JSON.parse(JSON.stringify(await this.usersService.removeUser(id))),
		});
	}
}
