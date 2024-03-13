import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookRepository } from '@cmn/database';

import { CreateBookCommand } from './create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(
    private readonly bookRepository: BookRepository,
  ) {
  }

  async execute(command: CreateBookCommand): Promise<void> {
    return await this.bookRepository.insert({
      userId: command.userId,
      title: command.title,
    });
  }
}
