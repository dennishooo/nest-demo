import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser({ firstName, lastName }: CreateUserRequest) {
    this.userClient.emit(
      'user_created',
      new UserCreatedEvent(firstName, lastName),
    );
  }
}
