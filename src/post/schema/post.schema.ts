import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PostDocument = Post & Document;
@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  authorEmail!: string;
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  subtitle!: string;
  @Prop({ required: true })
  content!: string;
  @Prop({ type: [String], required: true })
  category!: string[];
  @Prop({ required: true })
  slug!: string;
  @Prop()
  image!: string;
  @Prop({ default: 0 })
  postViews!: number;
  @Prop([String])
  usersLikeList!: string[];
  @Prop([String])
  usersCommentList!: string[];
  @Prop([String])
  usersLoveList!: string[];
  @Prop([String])
  usersSaveList!: string[];
  @Prop({ default: false })
  isFeatured!: boolean;
  @Prop({ enum: ['draft', 'published'], default: 'published' })
  status!: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
