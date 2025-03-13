import { IsEmail, IsString } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
