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
import { PaginationService } from 'src/shared/services/pagination/pagination.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private paginationService: PaginationService,
	) {}
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

	async findAllUsers(options: QueryOptions, route: string): Promise<Users> {
		const docCount = await this.userModel.countDocuments();
		const {
			limit,
			offset,
			filter,
			meta,
			links,
		} = this.paginationService.paginate({ options, route, docCount });

		/* add if: currentPage > totalPages */
		// add here

		const result = await this.userModel
			.find({ username: { $regex: filter, $options: 'i' } })
			.sort({ username: 'asc' })
			.skip(offset)
			.limit(limit)
			.exec();

		meta.totalDocs = result.length;
		if (!result) {
			throw new NotFoundException();
		} else {
			return {
				docs: result,
				meta: meta,
				links: links,
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
