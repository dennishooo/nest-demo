import { AggregateRoot } from '@nestjs/cqrs';
import { UserGreetEvent } from 'src/events/impl/user-greet.event';

export class User extends AggregateRoot {
  constructor(
    public readonly firstName: string,
    private readonly lastName: string,
  ) {
    super();
  }

  greet() {
    console.log('greeting from model...');

    // logic
    this.apply(new UserGreetEvent(this.firstName));
  }

  //   addItem(itemId: string) {
  //     // logic
  //     this.apply(new HeroFoundItemEvent(this.id, itemId));
  //   }
}
