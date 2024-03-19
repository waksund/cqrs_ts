import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities';

@Injectable()
export class UserRepository {
  constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async insert(user: Partial<User>): Promise<void> {
    await this.userRepository.insert(user);

    return void 0;
  }

  async create(user: Partial<User>): Promise<User> {
    const entity = this.userRepository.create(user);

    return await this.userRepository.save(entity);
  }

  async save(user: Partial<User>): Promise<void> {
    await this.userRepository.save(user);

    return void 0;
  }

  getById(userId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: userId });
  }
}
