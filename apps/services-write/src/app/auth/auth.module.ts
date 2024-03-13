import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
