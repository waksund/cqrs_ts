import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { NotificationService } from '@cmn/notification';

import { NotifyCommand } from './notify.command';

@CommandHandler(NotifyCommand)
export class NotifyHandler implements ICommandHandler<NotifyCommand> {
  constructor(
    private readonly notificationService: NotificationService,
  ) {
  }

  execute(command: NotifyCommand): Promise<void> {
    return this.notificationService.sendEmail(command.to, command.subject, command.body);
  }
}
