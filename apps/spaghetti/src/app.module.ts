import Redis from 'ioredis';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from '@cfg/config';
import { DISTRIBUTED_CACHE, EMAIL_PROVIDER } from '@cfg/constants';
import {
  Book,
  BookReview,
  DataBaseModule,
  User,
  Wallet,
  WalletOperations,
} from '@cmn/database';

import { SomeEmailLibrary } from './common/email-library';
import { AuthController } from './controllers/auth.controller';
import { BooksController } from './controllers/book.controller';

@Module({
  imports: [
    DataBaseModule,
    TypeOrmModule.forFeature(
      [
        Wallet,
        WalletOperations,
        Book,
        BookReview,
        User,
      ],
    ),
  ],
  providers: [
    {
      provide: DISTRIBUTED_CACHE,
      useValue: new Redis({
        host: config.get('redis.host'),
        port: config.get('redis.port'),
        password: config.get('redis.password'),
        keyPrefix: config.get('redis.keyPrefix'),
      }),
    },
    {
      provide: EMAIL_PROVIDER,
      useValue: new SomeEmailLibrary(),
    },
  ],
  controllers: [
    AuthController,
    BooksController,
  ],
})
export class AppModule {}
