import { IsString } from 'class-validator';

export class GetUserDTO {
  @IsString()
  id: string;
}
