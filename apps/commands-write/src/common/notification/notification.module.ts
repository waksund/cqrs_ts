import { Global, Module } from '@nestjs/common';

import { NotificationModule } from '@cmn/notification';

import { NotifyHandler } from './commands';
import { RegisterUserHandler } from './register-user.handler';

@Global()
@Module({
  imports: [
    NotificationModule,
  ],
  providers: [
    RegisterUserHandler,
    NotifyHandler,
  ],
})
export class NotifyModule {}
