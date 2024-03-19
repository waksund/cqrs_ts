import { Module } from '@nestjs/common';

import { CreateBookHandler } from './commands/create-book.handler';
import { CreateReviewHandler } from './commands/create-review.handler';
import { BooksController } from './controllers/book.controller';

@Module({
  providers: [
    CreateBookHandler,
    CreateReviewHandler,
  ],
  controllers: [
    BooksController,
  ],
})
export class BookModule {}
