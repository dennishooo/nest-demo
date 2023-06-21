import { Injectable } from '@nestjs/common';
import { user } from './fixtures/users';
import { User } from 'src/models/user.model';

@Injectable()
export class UserRepository {
  public users: User[] = [];
  async findOneByFirstName(firstName: string): Promise<User> {
    return this.users.find((user) => user.firstName === firstName);
  }

  async findAll() {
    return this.users;
  }

  async create(firstName: string, lastName: string): Promise<User> {
    const user = new User(firstName, lastName);
    this.users.push(user);
    return user;
  }
}
