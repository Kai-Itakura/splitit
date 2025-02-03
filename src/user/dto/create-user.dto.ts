import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserDTO implements User {
  id: number;
  email: string;
  name: string | null;

  @Exclude()
  password: string;
}
