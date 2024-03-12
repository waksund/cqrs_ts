import { Module } from '@nestjs/common';

import { BooksController } from './controllers/book.controller';
import { BookService } from './services/book.service';

@Module({
  providers: [
    BookService,
  ],
  controllers: [
    BooksController,
  ],
})
export class BookModule {}
