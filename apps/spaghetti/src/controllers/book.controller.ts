import { EntityManager, Repository } from 'typeorm';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Book, BookReview } from '@cmn/database';
import {
  BooksListItemDto,
  BooksListResultDto,
  CreateBookRequestDto,
  CreateReviewRequestDto,
} from '@spaghetti/common/dto';
import {
  BaseResponse,
  ErrorResponse,
  SuccessResponse,
} from '@spaghetti/common/response.dto';

@Controller({
  path: 'books',
})
export class BooksController {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(BookReview)
    private readonly bookReviewRepository: Repository<BookReview>,
    private readonly entityManager: EntityManager,
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() request: CreateBookRequestDto,
  ): Promise<BaseResponse> {
    try {
      if (!request.userId) {
        return new ErrorResponse(400, 'bad argument: \'userId\'');
      }

      if (!request.title) {
        return new ErrorResponse(400, 'bad argument: \'title\'');
      }

      const book: Book = this.bookRepository.create({
        userId: request.userId,
        title: request.title,
      });

      await this.bookRepository.insert(book);

      return new SuccessResponse();
    } catch (e) {
      console.error('some error', e);

      return new ErrorResponse(500, 'Server Error');
    }
  }

  @Post('review')
  @HttpCode(HttpStatus.OK)
  async createReview(
    @Body() request: CreateReviewRequestDto,
  ): Promise<BaseResponse> {
    try {
      if (!request.userId) {
        return new ErrorResponse(400, 'bad argument: \'userId\'');
      }

      if (!request.bookId) {
        return new ErrorResponse(400, 'bad argument: \'bookId\'');
      }

      if (!request.estimate || (request.estimate < 0 || request.estimate > 5)) {
        return new ErrorResponse(400, 'bad argument: \'estimate\'');
      }

      const review = this.bookReviewRepository.create({
        userId: request.userId,
        bookId: request.bookId,
        estimate: request.estimate,
      });

      await this.bookReviewRepository.insert(review);

      return new SuccessResponse();
    } catch (e) {
      console.error('some error', e);

      return new ErrorResponse(500, 'Server Error');
    }
  }

  @Get('list')
  async list(): Promise<SuccessResponse<BooksListResultDto>> {
    try {
      const books = await this.entityManager.query<BooksListItemDto[]>(`
            select
                b.id as id,
                b.title as title,
                u."fullName" as "authorFullName",
                r.avgReviewEstimate as "avgReviewEstimate"
            from books as b
            inner join users as u
            on u.id = b."userId"
            left join (select
                books_reviews."bookId" as bookId,
                avg(books_reviews.estimate) as avgReviewEstimate
            from books_reviews as books_reviews
            group by books_reviews."bookId") as r
            on r.bookId = b.id`);

      return new SuccessResponse({ books });
    } catch (e) {
      console.error('some error', e);

      return new ErrorResponse(500, 'Server Error');
    }
  }
}
