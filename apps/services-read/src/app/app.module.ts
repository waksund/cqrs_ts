import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DataBaseModule } from '@cmn/database';
import { BookModule } from '../app/book/book.module';

import { ErrorFilter } from '../common/error.filter';


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
