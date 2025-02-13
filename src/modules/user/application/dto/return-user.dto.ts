import { Exclude, Expose } from 'class-transformer';

export class ReturnUserDTO {
  @Expose({ name: 'id' })
  _id: string;

  @Expose({ name: 'email' })
  _email: string;

  @Expose({ name: 'name' })
  _name?: string;

  @Exclude({ toPlainOnly: true })
  _passwordHash: string;
}
