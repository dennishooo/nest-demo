import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/impl';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
    private readonly appService: AppService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('get_users')
  async getUsers() {
    console.log('getting users...');
    await this.queryBus.execute(new GetUsersQuery());
    return await this.appService.findAll();
  }

  @EventPattern('user_created')
  handleUserCreated(data: any) {
    console.log('received in controller', data);
    this.appService.handleUserCreated(data);
  }
}
