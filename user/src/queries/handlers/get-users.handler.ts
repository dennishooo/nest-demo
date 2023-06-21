import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/models/user.model';
import { UserRepository } from 'src/repository/user.repository';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: any): Promise<User[]> {
    console.log('Async GetUsersQuery...');

    return await this.userRepository.findAll();
  }
}
