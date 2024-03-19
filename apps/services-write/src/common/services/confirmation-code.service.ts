import { randomInt } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { config } from '@cfg/config';
import { CacheService } from '@cmn/cache';

@Injectable()
export class ConfirmationCodeService {
  constructor(
    private readonly cacheService: CacheService,
  ) {
  }

  async generate(userId: string): Promise<string> {
    const code = randomInt(1000, 9999);
    await this.cacheService.set(userId, code, config.get('code.ttlSec'));

    return code.toString();
  }

  get(userId: string): Promise<string | null> {
    return this.cacheService.get(userId);
  }
}
