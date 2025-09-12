import { ApiProperty } from '@nestjs/swagger';

export class ProfileImageDto {
  @ApiProperty({ description: 'プロフィール画像のURL' })
  url: string;
}

export class EventMemberDto {
  @ApiProperty({ description: 'メンバーID' })
  id: string;

  @ApiProperty({ description: 'メンバー名' })
  name: string;

  @ApiProperty({
    description: 'プロフィール画像',
    type: ProfileImageDto,
    nullable: true,
  })
  profileImage: ProfileImageDto | null;
}

export class PayerDto {
  @ApiProperty({ description: '支払者ID' })
  id: string;

  @ApiProperty({ description: '支払者名' })
  name: string;
}

export class PayeeDto {
  @ApiProperty({ description: '支払先ID' })
  id: string;
}

export class EventExpenseDto {
  @ApiProperty({ description: '支出ID' })
  id: string;

  @ApiProperty({ description: '支出タイトル' })
  title: string;

  @ApiProperty({ description: '支出金額' })
  amount: number;

  @ApiProperty({ description: '作成日時' })
  createdAt: Date;

  @ApiProperty({ description: '支払者情報', type: PayerDto })
  payer: PayerDto;

  @ApiProperty({ description: '支払先情報', type: [PayeeDto] })
  payees: PayeeDto[];
}

export class EventSettlementDto {
  @ApiProperty({ description: '精算ID' })
  id: string;

  @ApiProperty({ description: '支払先ID' })
  payeeId: string;

  @ApiProperty({ description: '支払者ID' })
  payerId: string;

  @ApiProperty({ description: '精算金額' })
  amount: number;
}

export class EventGroupDetailDto {
  @ApiProperty({ description: 'イベントグループID' })
  id: string;

  @ApiProperty({ description: 'イベントグループタイトル' })
  title: string;

  @ApiProperty({ description: '通貨' })
  currency: string;

  @ApiProperty({ description: '作成日時' })
  createdAt: Date;

  @ApiProperty({ description: 'メンバー一覧', type: [EventMemberDto] })
  member: EventMemberDto[];

  @ApiProperty({ description: '支出一覧', type: [EventExpenseDto] })
  expenses: EventExpenseDto[];

  @ApiProperty({ description: '精算一覧', type: [EventSettlementDto] })
  settlements: EventSettlementDto[];

  @ApiProperty({ description: '総支出額' })
  totalExpense: number;
}
