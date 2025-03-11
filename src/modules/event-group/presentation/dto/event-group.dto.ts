import { Expose } from 'class-transformer';

export class EventGroupDto {
  @Expose()
  id: string;

  @Expose({ name: '_title' })
  title: string;

  @Expose()
  memberCount: number;

  @Expose({ name: '_createdAt' })
  createdAt: Date;
}
