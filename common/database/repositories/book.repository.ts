import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Book} from "@cmn/database";
import {Repository} from "typeorm";

@Injectable()
export class BookRepository {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {
    }

    async insert(book: Partial<Book>): Promise<void>{
        await this.bookRepository.insert(book);
        return void 0;
    }
}
