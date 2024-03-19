import { User } from '@cmn/database';

export class RegisterUserCommand {
  constructor(
    public readonly user: User,
  ) {
  }
}
