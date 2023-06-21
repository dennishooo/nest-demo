import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/repository/user.repository';
import { User } from 'src/models/user.model';
import { CreateUserCommand } from './impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository, // private readonly publisher: EventPublisher,
  ) {}
  async execute({ firstName, lastName }: CreateUserCommand): Promise<string> {
    console.log('creating user in commandBus', { firstName, lastName });
    // this.publisher.mergeObjectContext(

    // )
    return await this.userRepository.create(firstName, lastName);
  }
}
