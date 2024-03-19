import { Injectable } from '@nestjs/common';

import {
  User,
  UserRepository,
  WalletRepository,
} from '@cmn/database';
import { NotificationService } from '@cmn/notification';
import { UserStatus } from '@cmn/types';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly walletRepository: WalletRepository,
    private readonly notificationService: NotificationService,
  ) {
  }

  create(email: string, fullName: string): Promise<User> {
    return this.userRepository.create({
      email,
      fullName,
      status: UserStatus.Created,
    });
  }

  async register(user: User): Promise<void> {
    if (user.status !== UserStatus.Created) {
      return void 0;
    }

    user.status = UserStatus.Registered;
    await this.userRepository.save(user);

    await this.walletRepository.insertWalletAndWalletOperation(user.id, '10');

    await this.notificationService.sendEmail(user.email, 'Registered', 'You have successfully registered');
  }
}
