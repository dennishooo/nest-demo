import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GetUsersConsumer } from './get-users-events.consumer';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    KafkaModule,

    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
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
  providers: [AppService, GetUsersConsumer],
})
export class AppModule {}
