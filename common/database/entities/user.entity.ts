import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserStatus } from '@cmn/types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text', { unique: true })
  public email: string;

  @Column('text')
  public fullName: string;

  @Column({ type: 'enum', enum: UserStatus, enumName: 'userStatusEnum' })
    status: UserStatus;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
