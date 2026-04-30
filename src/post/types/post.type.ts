import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';

@ObjectType()
export class Post {
  id!: string;
  @Field(() => User, { description: 'Author of the post', nullable: true })
  user!: User;
  @Field()
  title!: string;
  @Field()
  subtitle!: string;
  @Field()
  content!: string;
  @Field(() => [String])
  category!: string[];
  @Field()
  slug!: string;
  @Field()
  image!: string;
  @Field()
  postViews!: number;
  @Field(() => [String])
  usersLikeList!: string[];
  @Field(() => [String])
  usersCommentList!: string[];
  @Field(() => [String])
  usersLoveList!: string[];
  @Field(() => [String])
  usersSaveList!: string[];
  @Field()
  isFeatured!: boolean;
  @Field()
  status!: string;
  @Field()
  createdAt!: Date;
}
