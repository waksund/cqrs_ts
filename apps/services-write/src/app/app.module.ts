import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { config } from '@cfg/config';
import { CacheModule } from '@cmn/cache';
import { DataBaseModule } from '@cmn/database';
import { NotificationModule } from '@cmn/notification';
import { BookModule } from '@services-write/app/book/book.module';

import { ErrorFilter } from '../common/error.filter';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DataBaseModule,
    AuthModule,
    BookModule,
    NotificationModule,
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
