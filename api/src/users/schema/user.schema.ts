import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
	name: string;

	@Prop({ required: true, unique: true })
	userName: string;

	@Prop({ required: true })
	password: string;
}
export const CatSchema = SchemaFactory.createForClass(User);
