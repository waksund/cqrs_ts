import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BookReview} from "@cmn/database";
import {Repository} from "typeorm";

@Injectable()
export class BookReviewRepository {
    constructor(
        @InjectRepository(BookReview)
        private readonly bookRepositoryRepository: Repository<BookReview>,
    ) {
    }

    async insert(bookReview: Partial<BookReview>): Promise<void>{
        await this.bookRepositoryRepository.insert(bookReview);
        return void 0;
    }
}
