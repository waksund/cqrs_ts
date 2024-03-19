import {
  CommandBus,
  EventsHandler,
  IEventHandler,
} from '@nestjs/cqrs';

import { UserRepository } from '@cmn/database';
import { NotifyCommand } from '@commands-write/common/notification';
import { RegisterUserEvent } from '@commands-write/common/user/events';

@EventsHandler(RegisterUserEvent)
export class RegisterUserHandler implements IEventHandler<RegisterUserEvent> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {
  }

  async handle(event: RegisterUserEvent): Promise<void> {
    const user = await this.userRepository.getById(event.userId);

    return await this.commandBus.execute(new NotifyCommand(user!.email, 'Registered', 'You have successfully registered'));
  }
}
