import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Query } from '@nestjs/graphql';
import { Post } from './types/post.type';
import { User } from '../user/types/user.type';
import { UserService } from '../user/user.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreatePostInput } from './types/create-post.input';
import { CurrentUserPayload } from '../common/types/current-user.type';
import { PostQueryFilter } from './types/postQueryFilter.type';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}
  // Query ( TO List the post on the various filter like search, category, isFeatured and word limit)
  @Query(() => [Post])
  getPosts(
    @Args('filter', { type: () => PostQueryFilter, nullable: true })
    filter: PostQueryFilter,
  ) {
    return this.postService.getPosts(filter || {});
  }

  @Query(() => Post)
  getPostBySlug(@Args('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }

  //Muation
  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Args('input') input: CreatePostInput,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.postService.createPost(input, user);
  }

  //Get the user details from the post
  @ResolveField(() => User, { nullable: true })
  async user(@Parent() post: Post) {
    const authorEmail = (post as Post & { authorEmail?: string }).authorEmail;

    if (!authorEmail) {
      return null;
    }

    return this.userService.getUserByEmail(authorEmail);
  }
}
