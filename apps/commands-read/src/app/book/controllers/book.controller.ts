import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { BooksListResultDto } from '@services-read/common/dto';
import { SuccessResponse } from '@services-read/common/response.dto';

import { BookListQuery } from '../queries/book-list.query';

@Controller({
  path: 'books',
})
export class BooksController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  async list(): Promise<SuccessResponse<BooksListResultDto>> {
    const result = await this.queryBus.execute(new BookListQuery());

    return new SuccessResponse(result);
  }
}
