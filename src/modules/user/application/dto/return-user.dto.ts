import { Exclude } from 'class-transformer';

export class ReturnUserDTO {
  id: string;
  email: string;
  name?: string;

  @Exclude({ toPlainOnly: true })
  passwordHash: string;
}
