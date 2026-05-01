import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './schema/post.schema';
import { CreatePostInput } from './types/create-post.input';
import { CurrentUserPayload } from '../common/types/current-user.type';
import { PostQueryFilter } from './types/postQueryFilter.type';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private postModel: Model<PostDocument>,
  ) {}

  async getPosts(filterInput: PostQueryFilter) {
    const filter: Record<string, unknown> = {};

    // search title and content
    if (filterInput.search) {
      filter.$or = [
        { title: { $regex: filterInput.search, $options: 'i' } },
        { content: { $regex: filterInput.search, $options: 'i' } },
      ];
    }

    // category filter
    if (filterInput.category) {
      filter.category = filterInput.category;
    }

    // isFeatured filter (only when true)
    if (filterInput.isFeatured === true) {
      filter.isFeatured = true;
    }

    const posts = await this.postModel.find(filter);

    // word limit
    if (filterInput.wordLimit) {
      return posts.map((post) => {
        const limitedContent = post.content
          ?.split(' ')
          .slice(0, filterInput.wordLimit)
          .join(' ');

        return {
          ...post.toObject(),
          content: limitedContent,
        };
      });
    }

    return posts;
  }

  // Get Post By Slug
  async getPostBySlug(slug: string) {
    const post = await this.postModel.findOne({ slug });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  //Create Post
  async createPost(input: CreatePostInput, user: CurrentUserPayload) {
    const post = new this.postModel({
      ...input,
      authorEmail: user.email,
    });
    return post.save();
  }

  private limitContent(content: string, wordLimit?: number) {
    if (!content) return '';
    if (wordLimit === undefined) return content;

    const words = content.split(' ');
    if (words.length <= wordLimit) return content;

    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
