import { IsEmail, IsNotEmpty } from 'class-validator';

export class ConfirmCodeRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  code: string;
}
