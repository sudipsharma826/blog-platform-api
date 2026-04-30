import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsBoolean, IsArray } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  title!: string;

  @Field()
  subtitle!: string;

  @Field()
  @IsNotEmpty()
  content!: string;

  @Field()
  @IsBoolean()
  isFeatured!: boolean;

  @Field()
  status!: string;

  @Field(() => [String])
  @IsArray()
  categories!: string[];

  @Field()
  image!: string;
}
