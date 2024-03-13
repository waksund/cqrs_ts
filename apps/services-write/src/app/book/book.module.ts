import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BooksController } from './controllers/book.controller';
import { BookService } from './services/book.service';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    BookService,
  ],
  controllers: [
    BooksController,
  ],
})
export class BookModule {}
