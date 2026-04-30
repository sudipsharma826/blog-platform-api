import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetPostsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 100 })
  wordLimit?: number;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
    description:
      'Whether to include only featured posts or whole featured and non-featured posts',
  })
  isFeatured?: boolean;
}
