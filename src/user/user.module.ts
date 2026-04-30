import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])], // import to the user moduels to user the moduels
  providers: [UserResolver, UserService],
  exports: [UserService], // export the user service to use in other modules if needed
})
export class UserModule {}
