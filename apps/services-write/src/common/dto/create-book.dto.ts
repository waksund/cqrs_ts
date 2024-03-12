import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookRequestDto {
  @IsUUID('4')
  userId: string;

  @IsNotEmpty()
  title: string;
}
