import { IsString } from 'class-validator';

export class UpdateUserNameDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
