import { IsString } from 'class-validator';

export class EventGroupDto {
  @IsString()
  title: string;

  @IsString()
  currency: string;
}
