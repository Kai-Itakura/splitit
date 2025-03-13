import { IsEmail, IsString } from 'class-validator';

export class SigninAuthDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class LoginAuthDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
