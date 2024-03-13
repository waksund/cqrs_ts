import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfirmHandler } from './commands/confirm.handler';
import { LoginUserHandler } from './commands/login-user.handler';
import { RegisterUserHandler } from './commands/register-user.handler';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    RegisterUserHandler,
    LoginUserHandler,
    ConfirmHandler,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
