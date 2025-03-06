import { Id } from 'src/modules/shared/value-objects/id';

export class GroupUser {
  constructor(
    private readonly _id: Id,
    private readonly _name: string,
  ) {}

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name;
  }
}
