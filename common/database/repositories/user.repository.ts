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

  async save(user: Partial<User>): Promise<void> {
    await this.userRepository.save(user);

    return void 0;
  }
}
