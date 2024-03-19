import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CacheService } from '@cmn/cache';

import { GetConfirmationCodeCommand } from './get-confirmation-code.command';

@CommandHandler(GetConfirmationCodeCommand)
export class GetConfirmationCodeHandler implements ICommandHandler<GetConfirmationCodeCommand, string | null> {
  constructor(
    private readonly cacheService: CacheService,
  ) {
  }

  execute(command: GetConfirmationCodeCommand): Promise<string | null> {
    return this.cacheService.get(command.userId);
  }
}
