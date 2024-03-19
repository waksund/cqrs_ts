import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
} from '@nestjs/cqrs';

import { UserRepository } from '@cmn/database';
import { GenerateConfirmationCodeCommand } from '@commands-write/common/confirmation-code';
import { NotifyCommand } from '@commands-write/common/notification';
import { CreateUserCommand } from '@commands-write/common/user';

import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand, string> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {
  }

  async execute(command: RegisterUserCommand): Promise<string> {
    let user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      user = await this.commandBus.execute(new CreateUserCommand(command.email, command.fullName));
    }

    const code = await this.commandBus.execute(new GenerateConfirmationCodeCommand(user!.id));

    await this.commandBus.execute(new NotifyCommand(user!.email, 'Confirmation code', `Confirmation code: ${code}`));

    return code.toString();
  }
}
