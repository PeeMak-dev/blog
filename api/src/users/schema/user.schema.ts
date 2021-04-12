import { Role } from 'src/authentication/roles/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}

	@Prop()
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true, unique: true })
	username: string;

	@Exclude()
	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	roles: Role[];
}
export const UserSchema = SchemaFactory.createForClass(User);
