import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/impl';
import { CreateUserCommand } from './commands/impl/create-user.command';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
    private readonly appService: AppService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('get_users')
  async getUsers() {
    console.log('getting users...');
    let result = await this.queryBus.execute(new GetUsersQuery());
    console.log('result from query bus', result);

    return result;
  }

  @EventPattern('create_user')
  async createUser(data: any) {
    const { firstName, lastName } = data;
    console.log('creating users...');
    console.log('received in create_user controller', data);

    let result = await this.commandBus.execute(
      new CreateUserCommand(firstName, lastName),
    );
    console.log('result from command bus', result);

    return result;
  }
}
