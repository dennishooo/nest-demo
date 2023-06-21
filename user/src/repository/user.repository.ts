import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { User as MongoUser } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(MongoUser.name)
    private userModel: Model<MongoUser>,
  ) {}
  public users: User[] = [];
  async findOneByFirstName(firstName: string): Promise<User> {
    return this.users.find((user) => user.firstName === firstName);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async create(firstName: string, lastName: string): Promise<User> {
    const user = new User(firstName, lastName);
    await this.userModel.create(user);
    return user;
  }
}
