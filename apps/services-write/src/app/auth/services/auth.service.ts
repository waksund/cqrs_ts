import { randomInt } from 'node:crypto';

import { v4 } from 'uuid';
import { BadRequestException, Injectable } from '@nestjs/common';

import { config } from '@cfg/config';
import { Errors } from '@cfg/constants';
import { CacheService } from '@cmn/cache';
import { UserRepository, WalletRepository } from '@cmn/database';
import { NotificationService } from '@cmn/notification';
import { UserStatus } from '@cmn/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly walletRepository: WalletRepository,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService,
  ) {
  }

  async register(email: string, fullName: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    const userId = user?.id ?? v4();
    if (!user) {
      await this.userRepository.insert({
        id: userId,
        email,
        fullName,
        status: UserStatus.Created,
      });
    }

    const code = randomInt(1000, 9999);
    await this.cacheService.set(userId, code, config.get('code.ttlSec'));

    await this.notificationService.sendEmail(email, 'Confirmation code', `Confirmation code: ${code}`);

    return code.toString();
  }

  async login(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const code = randomInt(1000, 9999);
    await this.cacheService.set(user.id, code, config.get('code.ttlSec'));

    await this.notificationService.sendEmail(email, 'Confirmation code', `Confirmation code: ${code}`);

    return code.toString();
  }

  async confirm(email: string, code: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const cacheCode = await this.cacheService.get(user.id);
    if (cacheCode !== code) {
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
