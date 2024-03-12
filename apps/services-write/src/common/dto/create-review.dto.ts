import { IsNumber, IsUUID } from 'class-validator';

export class CreateReviewRequestDto {
  @IsUUID('4')
  userId: string;

  @IsUUID('4')
  bookId: string;

  @IsNumber()
  estimate: number;
}
