import { Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Query } from '@nestjs/graphql';
import { User } from './types/user.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  getUser() {
    return this.userService.getUsers(); // register the userservice and user resolver the app.modules
  }
  // In client-side to run the query
  // query{
  //   getUser({
  //     username
  //     isAdmin
  //     ... and other feild you want
  //   })
  // }
}
