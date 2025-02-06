import { compare, hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

export class User {
  private constructor(
    readonly id: string,
    readonly email: string,
    readonly passwordHash: string,
    readonly name?: string,
  ) {}

  /**
   * ユーザーの作成
   */
  static async create(email: string, password: string): Promise<User> {
    const id = uuidV4();
    const passwordHash = await hash(password, 10);
    return new User(id, email, passwordHash);
  }

  /**
   * パスワードの検証
   */
  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }
}
