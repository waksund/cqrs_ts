import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfirmationCodeService, UserService } from '@services-write/common/services';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    AuthService,
    UserService,
    ConfirmationCodeService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
