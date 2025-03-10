import { IsString } from 'class-validator';

export class FindUserDTO {
  @IsString()
  email: string;
}
