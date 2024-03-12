import { Injectable } from '@nestjs/common';

import { BookQueries } from '@cmn/database';
import {BooksListResultDto} from "@services-read/common/dto";

@Injectable()
export class BookService {
  constructor(
    private readonly bookQueries: BookQueries,
  ) {
  }

  async list(): Promise<BooksListResultDto> {
    const books = await this.bookQueries.list();

    return {
      books,
    };
  }
}
