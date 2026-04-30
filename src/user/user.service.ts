import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}
  // Create the service method to fetch all users from the database and use these service in resolver to get the data
  async getUsers() {
    return this.userModel.find();
  }
  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
