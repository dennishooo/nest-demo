import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/models/user.model';
import { UserRepository } from '../../repository/user.repository';
import { GetUsersQuery } from '../impl';
import { User as MongoUser } from 'src/schemas/user.schema';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: any): Promise<MongoUser[]> {
    console.log('Async GetUsersQuery...');

    return await this.userRepository.findAll();
  }
}
