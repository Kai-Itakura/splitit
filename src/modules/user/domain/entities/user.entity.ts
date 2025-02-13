import { compare, hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDTO } from '../../application/dto/create-user.dto';

export class User {
  private constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _passwordHash: string,
    private _name?: string,
  ) {}

  get id(): string {
    return this._id;
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
    const id = uuidV4();
    const passwordHash = await hash(dto.password, 10);
    return new User(id, dto.email, passwordHash);
  }

  /**
   * 再構築
   */
  static reconstitute(
    id: string,
    email: string,
    passwordHash: string,
    name?: string,
  ): User {
    return new User(id, email, passwordHash, name);
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
