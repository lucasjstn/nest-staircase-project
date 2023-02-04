import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true, minlength: 5, maxlength: 12 })
  username: string;

  @Prop({ required: true, minlength: 4, maxlength: 70 })
  password: string;

  @Prop()
  userId: string;

  @Prop({ default: Date.now() })
  createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
