import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullName: string;
}
