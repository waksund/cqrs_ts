export class CreateBookCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
  ) {
  }
}
