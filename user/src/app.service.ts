import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserCreatedEvent } from './user-created-event';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  handleUserCreated(userCreatedEvent: UserCreatedEvent) {
    console.log(userCreatedEvent);
  }
}
