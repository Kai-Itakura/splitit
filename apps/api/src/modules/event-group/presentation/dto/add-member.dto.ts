import { IsString } from 'class-validator';

export class MemberDto {
  @IsString()
  memberId: string;
}
