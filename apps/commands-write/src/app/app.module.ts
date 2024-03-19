import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';

import { config } from '@cfg/config';
import { CacheModule } from '@cmn/cache';
import { DataBaseModule } from '@cmn/database';
import { BonusModule } from '@commands-write/common/bonus';
import { ConfirmationCodeModule } from '@commands-write/common/confirmation-code';
import { NotifyModule } from '@commands-write/common/notification';
import { UserModule } from '@commands-write/common/user';
import { BookModule } from '@services-write/app/book/book.module';

import { ErrorFilter } from '../common/error.filter';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    DataBaseModule,
    AuthModule,
    BookModule,
    UserModule,
    ConfirmationCodeModule,
    BonusModule,
    NotifyModule,
    CacheModule.forRootAsync({
      async useFactory() {
        return {
          host: config.get('redis.host'),
          port: config.get('redis.port'),
          password: config.get('redis.password'),
          keyPrefix: config.get('redis.keyPrefix'),
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
