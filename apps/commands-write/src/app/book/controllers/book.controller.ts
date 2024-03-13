import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateBookRequestDto, CreateReviewRequestDto } from '@commands-write/common/dto';
import { BaseResponse, SuccessResponse } from '@commands-write/common/response.dto';

import { CreateBookCommand } from '../commands/create-book.command';
import { CreateReviewCommand } from '../commands/create-review.command';

@Controller({
  path: 'books',
})
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
        @Body() request: CreateBookRequestDto,
  ): Promise<BaseResponse> {
    await this.commandBus.execute(new CreateBookCommand(request.userId, request.title));

    return new SuccessResponse();
  }

  @Post('review')
  @HttpCode(HttpStatus.OK)
  async createReview(
        @Body() request: CreateReviewRequestDto,
  ): Promise<BaseResponse> {
    await this.commandBus.execute(new CreateReviewCommand(request.userId, request.bookId, request.estimate));

    return new SuccessResponse();
  }
}
