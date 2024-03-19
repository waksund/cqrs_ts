import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateBookRequestDto, CreateReviewRequestDto } from '@services-write/common/dto';
import { BaseResponse, SuccessResponse } from '@services-write/common/response.dto';

import { BookService } from '../services/book.service';

@Controller({
  path: 'books',
})
export class BooksController {
  constructor(
    private readonly bookService: BookService,
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
        @Body() request: CreateBookRequestDto,
  ): Promise<BaseResponse> {
    await this.bookService.create(request.userId, request.title);

    return new SuccessResponse();
  }

  @Post('review')
  @HttpCode(HttpStatus.OK)
  async createReview(
        @Body() request: CreateReviewRequestDto,
  ): Promise<BaseResponse> {
    await this.bookService.createReview(request.userId, request.bookId, request.estimate);

    return new SuccessResponse();
  }
}
