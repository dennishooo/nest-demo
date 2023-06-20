import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser({}: CreateUserRequest) {
    this.userClient.emit('user_created', new UserCreatedEvent('dennis', 'ho'));
  }
}
