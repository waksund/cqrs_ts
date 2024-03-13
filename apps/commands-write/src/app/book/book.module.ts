import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateBookHandler } from './commands/create-book.handler';
import { CreateReviewHandler } from './commands/create-review.handler';
import { BooksController } from './controllers/book.controller';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    CreateBookHandler,
    CreateReviewHandler,
  ],
  controllers: [
    BooksController,
  ],
})
export class BookModule {}
