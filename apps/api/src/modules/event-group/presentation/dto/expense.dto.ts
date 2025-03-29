import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';

export class ExpenseDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  payerId: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  payeeIds: string[];
}
