import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Errors } from '@cfg/constants';
import { CacheService } from '@cmn/cache';
import { UserRepository, WalletRepository } from '@cmn/database';
import { UserStatus } from '@cmn/types';

import { ConfirmCommand } from './confirm.command';

@CommandHandler(ConfirmCommand)
export class ConfirmHandler implements ICommandHandler<ConfirmCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly walletRepository: WalletRepository,
  ) {
  }

  async execute(command: ConfirmCommand): Promise<void> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const cacheCode = await this.cacheService.get(user.id);
    if (cacheCode !== command.code) {
      throw new BadRequestException(Errors.WrongCode);
    }

    if (user.status === UserStatus.Created) {
      await this.walletRepository.insertWalletAndWalletOperation(user.id, '10');

      user.status = UserStatus.Registered;
      await this.userRepository.save(user);
    }

    return void 0;
  }
}
