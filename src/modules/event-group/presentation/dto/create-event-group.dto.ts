import { IsString } from 'class-validator';
import { CurrencyType } from '../../domain/value-objects/currency';

export class CreateEventGroupDto {
  @IsString()
  title: string;

  @IsString()
  currency?: CurrencyType;
}
