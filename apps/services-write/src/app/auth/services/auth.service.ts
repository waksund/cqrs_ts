import { BadRequestException, Injectable } from '@nestjs/common';

import { Errors } from '@cfg/constants';
import { UserRepository } from '@cmn/database';
import { NotificationService } from '@cmn/notification';
import { ConfirmationCodeService, UserService } from '@services-write/common/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly confirmationCodeService: ConfirmationCodeService,
  ) {
  }

  async register(email: string, fullName: string): Promise<string> {
    let user = await this.userRepository.findByEmail(email);
    if (!user) {
      user = await this.userService.create(email, fullName);
    }

    const code = await this.confirmationCodeService.generate(user.id);

    await this.notificationService.sendEmail(email, 'Confirmation code', `Confirmation code: ${code}`);

    return code.toString();
  }

  async login(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const code = await this.confirmationCodeService.generate(user.id);

    await this.notificationService.sendEmail(email, 'Confirmation code', `Confirmation code: ${code}`);

    return code.toString();
  }

  async confirm(email: string, code: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException(Errors.UserNotFound);
    }

    const cacheCode = await this.confirmationCodeService.get(user.id);
    if (cacheCode !== code) {
      throw new BadRequestException(Errors.WrongCode);
    }

    await this.userService.register(user);

    return void 0;
  }
}
