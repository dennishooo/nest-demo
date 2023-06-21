import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';
import { EventsHandler } from './events';
import { CommandHandler } from './commands';
import { UserRepository } from './repository/user.repository';

describe('AppController', () => {
  let appController: AppController;
  let queryBus: QueryBus;
  let commandBus: CommandBus;
  // let queryBus: QueryBus;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        UserRepository,
        ...QueryHandlers,
        ...CommandHandler,
        // ...EventsHandler,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    queryBus = app.get<QueryBus>(QueryBus);
    commandBus = app.get<CommandBus>(CommandBus);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(queryBus).toBeDefined();
      expect(commandBus).toBeDefined();
    });

    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    // describe('root', () => {
    //   it('should return "Hello World!"', () => {
    //     expect(appController.getUsers()).toBe('Hello World!');
    //   });
    // });
  });
});
