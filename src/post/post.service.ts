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

  async getPosts(wordLimit?: number) {
    const posts = await this.postModel.find();

    return posts.map((post) => ({
      ...post.toObject(),
      content: this.limitContent(post.content, wordLimit), // Limit the content based on the provided word limit
    }));
  }

  private limitContent(content: string, wordLimit?: number) {
    if (!content) return '';
    if (wordLimit === undefined) return content;

    const words = content.split(' ');
    if (words.length <= wordLimit) return content;

    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
