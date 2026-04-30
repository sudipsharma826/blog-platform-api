import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetPostsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 100 })
  wordLimit?: number;
}