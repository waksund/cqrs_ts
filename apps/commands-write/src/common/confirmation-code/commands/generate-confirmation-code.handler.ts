import { randomInt } from 'node:crypto';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { config } from '@cfg/config';
import { CacheService } from '@cmn/cache';

import { GenerateConfirmationCodeCommand } from './generate-confirmation-code.command';

@CommandHandler(GenerateConfirmationCodeCommand)
export class GenerateConfirmationCodeHandler implements ICommandHandler<GenerateConfirmationCodeCommand, string> {
  constructor(
    private readonly cacheService: CacheService,
  ) {
  }

  async execute(command: GenerateConfirmationCodeCommand): Promise<string> {
    const code = randomInt(1000, 9999);
    await this.cacheService.set(command.userId, code, config.get('code.ttlSec'));

    return code.toString();
  }
}
