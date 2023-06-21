import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserGreetEvent } from './impl/user-greet.event';

@EventsHandler(UserGreetEvent)
export class UserGreetEventHandler implements IEventHandler<UserGreetEvent> {
  handle(event: UserGreetEvent) {
    console.log('[EVENT] greeting from ', event.firstName);
  }
}
