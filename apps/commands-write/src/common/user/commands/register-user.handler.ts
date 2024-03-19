import {
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';

import { UserRepository } from '@cmn/database';
import { UserStatus } from '@cmn/types';
import { RegisterUserEvent } from '@commands-write/common/user/events/register-user.event';

import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {
  }

  async execute(command: RegisterUserCommand): Promise<void> {
    const { user } = command;
    if (user.status !== UserStatus.Created) {
      return void 0;
    }

    user.status = UserStatus.Registered;
    await this.userRepository.save(user);

    void this.eventBus.publish(new RegisterUserEvent(user.id));
  }
}
