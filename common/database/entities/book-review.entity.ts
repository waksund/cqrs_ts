import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
