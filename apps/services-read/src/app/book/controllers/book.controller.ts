import { Controller, Get } from '@nestjs/common';

import { BooksListResultDto } from '@services-read/common/dto';
import { SuccessResponse } from '@services-read/common/response.dto';

import { BookService } from '../services/book.service';

@Controller({
  path: 'books',
})
export class BooksController {
  constructor(
    private readonly bookService: BookService,
  ) {
  }

  @Get('list')
  async list(): Promise<SuccessResponse<BooksListResultDto>> {
    const result = await this.bookService.list();

    return new SuccessResponse(result);
  }
}
