import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./user.entity";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('uuid')
    userId: string;

    @Column('text')
    public title: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
