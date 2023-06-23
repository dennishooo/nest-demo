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

  async getUsers() {
    console.log('getting users...');

    let result = this.userClient.send('get_users', { msg: 'haha' });
    console.log('observable?', result);

    // .subscribe((data) => {
    //   console.log('whyyyy');
    //   console.log('response from message [getUsers]', data);
    // });
    return result;
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
