import { randomInt } from 'node:crypto';

import { v4 } from 'uuid';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { config } from '@cfg/config';
import { CacheService } from '@cmn/cache';
import { UserRepository } from '@cmn/database';
import { NotificationService } from '@cmn/notification';
import { UserStatus } from '@cmn/types';

import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand, string> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService,
  ) {
  }

  async execute(command: RegisterUserCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    const userId = user?.id ?? v4();
    if (!user) {
      await this.userRepository.insert({
        id: userId,
        email: command.email,
        fullName: command.fullName,
        status: UserStatus.Created,
      });
    }

    const code = randomInt(1000, 9999);
    await this.cacheService.set(userId, code, config.get('code.ttlSec'));

    await this.notificationService.sendEmail(command.email, 'Confirmation code', `Confirmation code: ${code}`);

    return code.toString();
  }
}
