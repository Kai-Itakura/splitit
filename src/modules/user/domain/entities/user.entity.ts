import { compare, hash } from 'bcrypt';
import { Id } from 'src/modules/shared/value-objects/id';
import { CreateUserDTO } from '../../presentation/dto/create-user.dto';

export class User {
  private constructor(
    private readonly _id: Id,
    private readonly _email: string,
    private readonly _passwordHash: string,
    private _name?: string,
  ) {}

  get id(): string {
    return this._id.value;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get name(): string | undefined {
    return this._name;
  }

  /**
   * 作成
   */
  static async create(dto: CreateUserDTO): Promise<User> {
    const passwordHash = await hash(dto.password, 10);
    return new User(Id.create(), dto.email, passwordHash);
  }

  /**
   * 再構築
   */
  static reconstruct(
    id: string,
    email: string,
    passwordHash: string,
    name?: string,
  ): User {
    return new User(Id.reconstruct(id), email, passwordHash, name);
  }

  /**
   * 名前の変更
   */
  changeName(newName: string): void {
    this._name = newName;
  }

  /**
   * パスワードの検証
   */
  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this._passwordHash);
  }
}
