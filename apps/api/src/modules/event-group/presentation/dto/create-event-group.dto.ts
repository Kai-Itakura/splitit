import { CurrencyType } from '@repo/types/currency.type';
import { IsString } from 'class-validator';

export class CreateEventGroupDto {
  @IsString()
  title: string;

  @IsString()
  currency?: CurrencyType;
}
