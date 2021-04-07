import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const newUser = new this.userModel(createUserDto);
		try {
			return await newUser.save();
		} catch (error) {
			console.log(error);
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}
	}

	async findAllUsers(): Promise<User[]> {
		const users = await this.userModel.find().exec();
		return users;
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

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
