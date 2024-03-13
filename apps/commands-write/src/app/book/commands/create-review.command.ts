export class CreateReviewCommand {
  constructor(
    public readonly userId: string,
    public readonly bookId: string,
    public readonly estimate: number,
  ) {
  }
}
