import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';
import { UserRepository } from './repository/user.repository';
import { CommandHandler } from './commands';
import { EventsHandler } from './events';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserRepository,
    ...QueryHandlers,
    ...CommandHandler,
    ...EventsHandler,
  ],
})
export class AppModule {}
