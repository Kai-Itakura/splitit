import { Id } from 'src/modules/shared/value-objects/id';

export class User {
  private constructor(
    private readonly _id: Id,
    private readonly _email: string,
    private _name: string,
  ) {}

  get id(): string {
    return this._id.value;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  /**
   * 再構築
   */
  static reconstruct(id: string, email: string, name: string): User {
    return new User(Id.reconstruct(id), email, name);
  }

  /**
   * 名前の変更
   */
  changeName(newName: string): void {
    this._name = newName;
  }
}
