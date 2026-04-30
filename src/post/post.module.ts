import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostSchema } from './schema/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    UserModule,
  ],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
