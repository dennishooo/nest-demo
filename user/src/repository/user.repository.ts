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

  async create(firstName: string, lastName: string) {
    this.users.push(new User(firstName, lastName));
    return `${firstName} created from repo!`;
  }
}
