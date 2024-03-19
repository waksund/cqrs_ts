import { BadRequestException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
} from '@nestjs/cqrs';

import { Errors } from '@cfg/constants';
import { UserRepository } from '@cmn/database';
import { GenerateConfirmationCodeCommand } from '@commands-write/common/confirmation-code';
import { NotifyCommand } from '@commands-write/common/notification';

import { LoginUserCommand } from './login-user.command';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand, string> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {
  }

  async execute(command: LoginUserCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const code = await this.commandBus.execute(new GenerateConfirmationCodeCommand(user.id));

    await this.commandBus.execute(new NotifyCommand(user.email, 'Confirmation code', `Confirmation code: ${code}`));


    return code.toString();
  }
}
