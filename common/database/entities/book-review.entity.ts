import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./user.entity";
import {Book} from "./book.entity";

@Entity('books_reviews')
export class BookReview {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('decimal', { precision: 2, scale: 1 })
    estimate: number;

    @ManyToOne('User')
    public user: User;

    @ManyToOne('Book')
    public book: Book;

    @CreateDateColumn()
    public createdAt: Date;
}
