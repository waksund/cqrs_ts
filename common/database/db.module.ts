import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookQueries } from '@cmn/database/queries';

import { config } from '../config/config';

import {
  Book,
  BookReview,
  User,
  Wallet,
  WalletOperations,
} from './entities';
import {
  BookRepository,
  BookReviewRepository,
  UserRepository,
  WalletRepository,
} from './repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          url: config.get('db.url'),
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          synchronize: false,
          logging: config.get('db.logging'),
          migrationsRun: true,
          migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        };
      },
    }),
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
    BookRepository,
    BookReviewRepository,
    UserRepository,
    WalletRepository,
    BookQueries,
  ],
  exports: [
    BookRepository,
    BookReviewRepository,
    UserRepository,
    WalletRepository,
    BookQueries,
  ],
})
export class DataBaseModule {}
