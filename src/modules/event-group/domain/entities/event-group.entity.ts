import { Id } from 'src/modules/shared/value-objects/id';
import { Expense } from './expense.entity';
import { GroupUser } from './group-user.entity';

export class EventGroup {
  private readonly _id: Id;
  private readonly _title: string;
  private readonly _currency: string;
  private readonly _users: GroupUser[];
  private readonly expenses: Expense[];
}
