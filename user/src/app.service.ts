import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserCreatedEvent } from './user-created-event';
import { user } from './repository/fixtures/users';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findAll() {
    console.log('returning', [user]);

    return [user];
  }

  handleUserCreated(userCreatedEvent: UserCreatedEvent) {
    console.log(userCreatedEvent);
  }
}
