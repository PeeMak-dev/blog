import { QueryOptions } from './../models/query-option.interface';
import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './dto/users.dto';
import { User, UserDocument } from './schema/user.schema';
import { Role } from 'src/authentication/roles/role.enum';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const newUser = new this.userModel(createUserDto);
		newUser.roles.push(Role.User);
		try {
			return await newUser.save();
		} catch (error) {
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}
	}

	/* 
	async findAllUsers(): Promise<User[]> {
		const users = await this.userModel.find().exec();
		return users;
	} */

	async findAllUsers(options: QueryOptions): Promise<Users> {
		const result = await this.userModel
			.find()
			.skip(Number(options.offset))
			.limit(Number(options.limit))
			.exec();

		const count = await this.userModel.countDocuments();
		console.log(count);
		if (!result) {
			throw new NotFoundException();
		} else {
			return {
				docs: result,
				meta: {
					limit: options.limit,
					totalDocs: result.length,
					estimatedDocs: count,
					offset: options.offset,
				},
			};
		}
	}

	async findUser(id: string): Promise<User> {
		const user = await this.userModel.findById(id).exec();

		if (!user) {
			throw new NotFoundException();
		} else {
			return user;
		}
	}

	async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const newUser = await this.userModel
			.findByIdAndUpdate(
				id,
				{ ...updateUserDto },
				{ new: true, useFindAndModify: false },
			)
			.exec();

		if (!newUser) {
			throw new NotFoundException('User not found!');
		} else {
			return newUser;
		}
	}

	async removeUser(id: string): Promise<User> {
		const removedUser = await this.userModel.findByIdAndDelete(id).exec();

		if (!removedUser) {
			throw new ForbiddenException('User not found!');
		} else {
			return removedUser;
		}
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await this.userModel.findOne({ email: email });

		if (!user) {
			throw new NotFoundException('User not found!');
		} else {
			return user;
		}
	}
}
