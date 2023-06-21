import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
  ) {
    super();
  }

  //   killEnemy(enemyId: string) {
  //     // logic
  //     this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  //   }

  //   addItem(itemId: string) {
  //     // logic
  //     this.apply(new HeroFoundItemEvent(this.id, itemId));
  //   }
}
