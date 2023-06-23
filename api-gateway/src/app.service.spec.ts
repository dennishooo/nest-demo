import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';
// import { of } from 'rxjs';

describe('AppController', () => {
  let appService: AppService;
  let userClient: ClientKafka;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'USER_SERVICE',
          useValue: {
            emit: jest.fn(),
            send: jest
              .fn()
              .mockReturnValue([{ firstName: 'dennis', lastName: 'ho' }]),
          },
        },
      ],
    }).compile();
    appService = app.get<AppService>(AppService);
    userClient = app.get<ClientKafka>('USER_SERVICE');

    jest.clearAllMocks();
  });

  describe('service', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined();
      expect(userClient).toBeDefined();
    });

    it('should call client.send', async () => {
      expect(appService.getUsers()).resolves.toStrictEqual([
        { firstName: 'dennis', lastName: 'ho' },
      ]);
      expect(userClient.send).toBeCalledWith('get_users', { msg: 'haha' });
    });
  });
});
