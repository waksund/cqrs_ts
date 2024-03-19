export class NotifyCommand {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly body: string,
  ) {
  }
}
