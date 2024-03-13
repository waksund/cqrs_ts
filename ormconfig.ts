import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://postgres:1@localhost:5432/postgres',
  synchronize: false,
  logging: true,
  entities: ['common/database/entities/*.entity{.ts,.js}'],
});
