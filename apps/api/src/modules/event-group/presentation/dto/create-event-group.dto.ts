import { IsString } from 'class-validator';

export class CreateEventGroupDto {
  @IsString()
  title: string;

  @IsString()
  currency: string;
}
