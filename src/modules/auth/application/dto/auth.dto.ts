import { IsEmail, IsInt, IsString } from 'class-validator';

export class AuthDTO {
  @IsInt()
  userId: number;

  @IsEmail()
  @IsString()
  email: string;
}
