import { randomInt } from 'node:crypto';

import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { config } from '@cfg/config';
import { Errors } from '@cfg/constants';
import { CacheService } from '@cmn/cache';
import { UserRepository } from '@cmn/database';
import { NotificationService } from '@cmn/notification';

import { LoginUserCommand } from './login-user.command';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand, string> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService,
  ) {
  }

  async execute(command: LoginUserCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const code = randomInt(1000, 9999);
    await this.cacheService.set(user.id, code, config.get('code.ttlSec'));

    await this.notificationService.sendEmail(command.email, 'Confirmation code', `Confirmation code: ${code}`);

    return code.toString();
  }
}
