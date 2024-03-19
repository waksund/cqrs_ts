import { Global, Module } from '@nestjs/common';

import { RegisterUserHandler } from './register-user.handler';

@Global()
@Module({
  providers: [
    RegisterUserHandler,
  ],
})
export class BonusModule {}
