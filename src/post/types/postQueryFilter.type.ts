import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PostQueryFilter {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  isFeatured?: boolean;

  @Field(() => Int, { nullable: true })
  wordLimit?: number;
}
