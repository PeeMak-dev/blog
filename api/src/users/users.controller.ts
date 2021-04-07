import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.createUser(createUserDto);
	}

	@Get()
	async findAllUsers(): Promise<User[]> {
		return await this.usersService.findAllUsers();
	}

	@Get(':id')
	async findUser(@Param('id') id: string): Promise<User> {
		return await this.usersService.findUser(id);
	}

	@Patch(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return await this.usersService.updateUser(id, updateUserDto);
	}

	@Delete(':id')
	async removeUser(@Param('id') id: string): Promise<User> {
		return await this.usersService.removeUser(id);
	}
}
