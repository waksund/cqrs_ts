import { BadRequestException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
} from '@nestjs/cqrs';

import { Errors } from '@cfg/constants';
import { UserRepository } from '@cmn/database';
import { GetConfirmationCodeCommand } from '@commands-write/common/confirmation-code';
import { RegisterUserCommand } from '@commands-write/common/user';

import { ConfirmCommand } from './confirm.command';

@CommandHandler(ConfirmCommand)
export class ConfirmHandler implements ICommandHandler<ConfirmCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {
  }

  async execute(command: ConfirmCommand): Promise<void> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const cacheCode = await this.commandBus.execute(new GetConfirmationCodeCommand(user.id));
    if (cacheCode !== command.code) {
      throw new BadRequestException(Errors.WrongCode);
    }

    await this.commandBus.execute(new RegisterUserCommand(user));

    return void 0;
  }
}
