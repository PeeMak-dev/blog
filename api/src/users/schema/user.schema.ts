import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true, unique: true })
	username: string;

	@Exclude()
	@Prop({ required: true })
	password: string;

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}

	@Prop({ required: true })
	password: string;

}
export const UserSchema = SchemaFactory.createForClass(User);
