import { IsEmail } from 'class-validator';

export class LoginUserRequestDto {
  @IsEmail()
  email: string;
}
