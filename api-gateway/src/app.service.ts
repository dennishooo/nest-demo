import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { UserCreatedEvent } from './user-created-event';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    // able to send msg, but could not receive the response
    console.log('getting users...');

    this.userClient.send('get_users', { msg: 'hiii' }).subscribe((data) => {
      console.log('whyyyy');
      console.log('response from message [getUsers]', data);
    });
    return 'user got';
  }

  createUser({ firstName, lastName }: CreateUserRequest) {
    this.userClient.emit(
      'create_user',
      new UserCreatedEvent(firstName, lastName),
    );
  }
  async onModuleInit() {
    this.userClient.subscribeToResponseOf('get_users');
    await this.userClient.connect();
  }
}
