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
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService, // @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('get_users')
  handleResponse(@Payload() data: any): void {
    console.log('Received response in Controller: ', data);
  }

  @Get('users')
  async getUsers(): Promise<any> {
    return await this.appService.getUsers();
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    console.log(createUserRequest);
    return this.appService.createUser(createUserRequest);
  }

  onModuleInit() {
    //   this.userClient.subscribeToResponseOf('get_users');
  }
}
