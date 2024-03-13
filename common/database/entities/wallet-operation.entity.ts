import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Wallet } from './wallet.entity';

@Entity('wallet_operations')
export class WalletOperations {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne('Wallet')
  public wallet: Wallet;

  @Column('decimal', { precision: 128, scale: 64, default: '0' })
    amount: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
