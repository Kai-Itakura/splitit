import { IsString } from 'class-validator';
import { Currency } from '../../domain/types/currency.type';

export class CreateEventGroupDto {
  @IsString()
  title: string;

  @IsString()
  currency?: Currency;
}
