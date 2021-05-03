import { Links } from './../models/links.interface';
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

	async findAllUsers(options: QueryOptions, route: string): Promise<Users> {
		const offset = Number((options.page - 1) * options.limit);
		const limit = options.limit;
		const currentPage = options.page;
		const count = await this.userModel.countDocuments();
		const totalPages = this.calcTotalPage({ count, limit });

		/* add if: currentPage > totalPages */
		// add here

		const result = await this.userModel
			.find()
			.skip(Number(offset))
			.limit(Number(options.limit))
			.exec();

		if (!result) {
			throw new NotFoundException();
		} else {
			return {
				docs: result,
				meta: {
					limit: limit ? limit : null,
					totalDocs: result.length,
					estimatedDocs: count,
					offset: offset,
					currentPage: currentPage ? currentPage : 1,
					totalPages: currentPage ? totalPages : 1,
				},
				links: {
					...this.generateLinks({ limit, currentPage, totalPages, route }),
				},
			};
		}
	}

	calcTotalPage({ count, limit }: { count: number; limit: number }): number {
		const remainder = count % limit;

		if (remainder > 0) {
			return Math.floor(count / limit) + 1;
		} else {
			return Math.floor(count / limit);
		}
	}

	generateLinks({
		limit,
		currentPage,
		totalPages,
		route,
	}: {
		limit: number;
		currentPage: number;
		totalPages: number;
		route: string;
	}): Links {
		if (limit) {
			const links: Links = {
				first: `${route}?page=${1}&limit=${limit}`,
				next:
					currentPage < totalPages
						? `${route}?page=${Number(currentPage) + 1}&limit=${limit}`
						: `${route}?page=${totalPages}&limit=${limit}`,
				previous:
					currentPage > 1
						? `${route}?page=${Number(currentPage) - 1}&limit=${limit}`
						: null,
				last: `${route}?page=${totalPages}&limit=${limit}`,
			};

			return links;
		} else {
			const links: Links = {
				first: null,
				next: null,
				previous: null,
				last: null,
			};

			return links;
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
