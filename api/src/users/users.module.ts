import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { PaginationService } from 'src/shared/services/pagination/pagination.service';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: () => {
					const schema = UserSchema;
					schema.pre('save', async function (next) {
						// eslint-disable-next-line @typescript-eslint/no-this-alias
						const user: any = this;
						const password: string = user.password;
						const salt: string = await bcrypt.genSalt();
						const hash: string = await bcrypt.hash(password, salt);

						user.password = hash;
						next();
					});

					return schema;
				},
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService, PaginationService],
	exports: [UsersService],
})
export class UsersModule {}
