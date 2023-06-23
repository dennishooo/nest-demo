import { Injectable, OnModuleInit } from '@nestjs/common';
import ConsumerService from './kafka/consumer.service';

@Injectable()
export class GetUsersConsumer implements OnModuleInit {
  constructor(private consumerService: ConsumerService) {}
  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['get_users'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log('consuming get users', {
            values: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
