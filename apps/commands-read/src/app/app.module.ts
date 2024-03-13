import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DataBaseModule } from '@cmn/database';

import { ErrorFilter } from '../common/error.filter';

import { BookModule } from './book/book.module';


@Module({
  imports: [
    DataBaseModule,
    BookModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
