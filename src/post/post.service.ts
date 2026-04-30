import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private postModel: Model<PostDocument>,
  ) {}

  async getPosts() {
    const posts = await this.postModel.find();

    return posts.map((post) => ({
      ...post.toObject(),
      content: this.limitContent(post.content, 20), // Limit the content to 20 characters for the post list view
    }));
  }

  private limitContent(content: string, limit: number) {
    if (!content) return '';
    return content.length > limit
      ? content.substring(0, limit) + '...'
      : content;
  }
}
