import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./user.entity";

@Entity('wallet')
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne('User')
    public user: User;

    @Column('decimal', { precision: 128, scale: 64, default: '0' })
    balance: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
