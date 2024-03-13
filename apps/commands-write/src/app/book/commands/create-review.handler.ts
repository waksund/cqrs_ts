import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookReviewRepository } from '@cmn/database';

import { CreateReviewCommand } from './create-review.command';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {
  constructor(
    private readonly bookReviewRepository: BookReviewRepository,
  ) {
  }

  async execute(command: CreateReviewCommand): Promise<void> {
    return await this.bookReviewRepository.insert({
      userId: command.userId,
      bookId: command.bookId,
      estimate: command.estimate,
    });
  }
}
