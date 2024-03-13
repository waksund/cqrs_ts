import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from '../entities';

@Injectable()
export class BookRepository {
  constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
  ) {
  }

  async insert(book: Partial<Book>): Promise<void> {
    await this.bookRepository.insert(book);

    return void 0;
  }
}
