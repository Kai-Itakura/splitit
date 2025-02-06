import { Exclude } from 'class-transformer';
import { User } from '../../domain/entities/user.entity';

export class ReturnUserDTO extends User {
  @Exclude({ toPlainOnly: true })
  passwordHash: string;
}
