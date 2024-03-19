import { Global, Module } from '@nestjs/common';

import { CreateUserHandler, RegisterUserHandler } from './commands';

@Global()
@Module({
  providers: [
    CreateUserHandler,
    RegisterUserHandler,
  ],
  exports: [
    CreateUserHandler,
    RegisterUserHandler,
  ],
})
export class UserModule {}
