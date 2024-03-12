import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./user.entity";
import {Book} from "./book.entity";

@Entity('books_reviews')
export class BookReview {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('decimal', { precision: 2, scale: 1 })
    estimate: number;

    @Column('uuid')
    public userId: string;

    @Column('uuid')
    public bookId: string;

    @CreateDateColumn()
    public createdAt: Date;
}
