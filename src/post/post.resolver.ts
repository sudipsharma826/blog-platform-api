import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Query } from '@nestjs/graphql';
import { Post } from './types/post.type';
import { User } from '../user/types/user.type';
import { UserService } from '../user/user.service';
import { GetPostsArgs } from './types/post.args';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}
  // Query
  @Query(() => [Post])
  async getPosts(@Args() args: GetPostsArgs) {
    return this.postService.getPosts(args.wordLimit);
  }

  // Mutation
  async createPost(){
    // Implementation for creating a post
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
