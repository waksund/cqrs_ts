import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BooksController } from './controllers/book.controller';
import { BookListHandler } from './queries/book-list.handler';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    BookListHandler,
  ],
  controllers: [
    BooksController,
  ],
})
export class BookModule {}
