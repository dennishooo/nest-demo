import { Injectable } from '@nestjs/common';
import { user } from './fixtures/users';
import { User } from 'src/models/user.model';

@Injectable()
export class UserRepository {
  async findOneByFirstName(firstName: string): Promise<User> {
    return user;
  }

  async findAll() {
    return [user];
  }
}
