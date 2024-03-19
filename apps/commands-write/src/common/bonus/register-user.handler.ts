import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { WalletRepository } from '@cmn/database';
import { RegisterUserEvent } from '@commands-write/common/user/events';

@EventsHandler(RegisterUserEvent)
export class RegisterUserHandler implements IEventHandler<RegisterUserEvent> {
  constructor(
    private readonly walletRepository: WalletRepository,
  ) {
  }

  handle(event: RegisterUserEvent): Promise<void> {
    return this.walletRepository.insertWalletAndWalletOperation(event.userId, '10');
  }
}
