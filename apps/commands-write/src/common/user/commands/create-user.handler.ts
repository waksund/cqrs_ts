import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User, UserRepository } from '@cmn/database';
import { UserStatus } from '@cmn/types';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, User> {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  async execute(command: CreateUserCommand): Promise<User> {
    return await this.userRepository.create({
      email: command.email,
      fullName: command.fullName,
      status: UserStatus.Created,
    });
  }
}
