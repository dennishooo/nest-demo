import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

import { CreateUserCommand } from './commands/impl/create-user.command';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let queryBus: QueryBus;
  let commandBus: CommandBus;
  // let queryBus: QueryBus;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: QueryBus,
          useValue: { execute: jest.fn().mockReturnValue('hihi') },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: jest
              .fn()
              .mockReturnValue({ firstName: 'dennis', lastName: 'ho' }),
          },
        },
      ],
    }).compile();

    // spy on console.log to disable log
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});

    appController = app.get<AppController>(AppController);
    queryBus = app.get<QueryBus>(QueryBus);
    commandBus = app.get<CommandBus>(CommandBus);
    // await app.init();
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
      expect(queryBus).toBeDefined();
      expect(commandBus).toBeDefined();
    });

    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return all users', () => {
      expect(appController.getUsers()).resolves.toBe('hihi');
      expect(queryBus.execute).toBeCalled();
    });

    it('should create user', () => {
      expect(
        appController.createUser({ firstName: 'dennis', lastName: 'ho' }),
      ).resolves.toStrictEqual({ firstName: 'dennis', lastName: 'ho' });
      expect(commandBus.execute).toBeCalledWith(
        new CreateUserCommand('dennis', 'ho'),
      );
      expect(commandBus.execute).toBeCalledTimes(1);
    });
  });
});
