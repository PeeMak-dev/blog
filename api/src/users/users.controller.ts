import { Public } from './../shared/decorators/public.decorator';
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
	UseGuards,
	Req,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Roles } from 'src/authentication/roles/roles.decorator';
import { Role } from 'src/authentication/roles/role.enum';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Users } from './dto/users.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Public()
	@UsePipes(new ValidationPipe({ whitelist: true }))
	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return new User({
			...JSON.parse(
				JSON.stringify(await this.usersService.createUser(createUserDto)),
			),
		});
	}

	// @UseGuards(RolesGuard)
	// @Roles(Role.Admin)
	@Public()
	@Get()
	async findAllUsers(@Req() req) {
		const res = await this.usersService.findAllUsers(
			req.query,
			'http://localhost:3000/api/users',
		);

		return new Users({
			docs: res.docs.map(
				(user) => new User({ ...JSON.parse(JSON.stringify(user)) }),
			),
			meta: res.meta,
			links: res.links,
		});

		// return users.map(
		// 	(user) => new User({ ...JSON.parse(JSON.stringify(user)) }),
		// );
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

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Delete(':id')
	async removeUser(@Param('id') id: string): Promise<User> {
		return new User({
			...JSON.parse(JSON.stringify(await this.usersService.removeUser(id))),
		});
	}
}
