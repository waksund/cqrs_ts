import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookQueries } from '@cmn/database';
import { BooksListResultDto } from '@services-read/common/dto';

import { BookListQuery } from './book-list.query';

@QueryHandler(BookListQuery)
export class BookListHandler implements IQueryHandler<BookListQuery, BooksListResultDto> {
  constructor(
    private readonly bookQueries: BookQueries,
  ) {
  }

  async execute(query: BookListQuery): Promise<BooksListResultDto> {
    const books = await this.bookQueries.list();

    return {
      books,
    };
  }
}
