import { IsDate, IsNumber, IsString } from 'class-validator';

export class EventGroupDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  memberCount: number;

  @IsDate()
  createdAt: Date;
}
