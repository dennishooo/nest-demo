import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequest } from './create-user-request.dto';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): string {
    return this.appService.getUsers();
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    console.log(createUserRequest);
    return this.appService.createUser(createUserRequest);
  }

  onModuleInit() {
    this.userClient.subscribeToResponseOf('get_users');
  }
}
