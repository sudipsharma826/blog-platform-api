import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: '/images/user.png' })
  photoURL!: string;

  @Prop({ default: false })
  isAdmin!: boolean;

  @Prop({ default: null })
  lastLogin!: Date;

  @Prop([{ type: String }])
  likedPosts!: string[];

  @Prop([{ type: String }])
  lovedPosts!: string[];

  @Prop([{ type: String }])
  savedPosts!: string[];

  @Prop([{ type: String }])
  commentPosts!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
