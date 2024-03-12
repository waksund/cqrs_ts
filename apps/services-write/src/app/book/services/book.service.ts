import { Injectable } from '@nestjs/common';

import { BookRepository, BookReviewRepository } from '@cmn/database';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly bookReviewRepository: BookReviewRepository,
  ) {
  }

  async create(userId: string, title: string): Promise<void> {
    return await this.bookRepository.insert({
      userId,
      title,
    });
  }

  async createReview(userId: string, bookId: string, estimate: number): Promise<void> {
    return await this.bookReviewRepository.insert({
      userId,
      bookId,
      estimate,
    });
  }
}
