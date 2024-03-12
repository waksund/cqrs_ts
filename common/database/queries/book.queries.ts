import {Injectable} from "@nestjs/common";
import {EntityManager} from "typeorm";
import {BooksListItemDto} from "../dto/books-list.dto";

@Injectable()
export class BookQueries {
    constructor(
        private readonly entityManager: EntityManager,
    ) {
    }

    list(): Promise<BooksListItemDto[]>{
        return this.entityManager.query<BooksListItemDto[]>(`
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
                sum(books_reviews.estimate)/count(books_reviews.id) as avgReviewEstimate
            from books_reviews as books_reviews
            group by books_reviews."bookId") as r
            on r.bookId = b.id`);
    }
}
