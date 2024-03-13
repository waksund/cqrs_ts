export class ConfirmCommand {
  constructor(
    public readonly email: string,
    public readonly code: string,
  ) {
  }
}
