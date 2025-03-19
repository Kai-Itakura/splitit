import { User } from '../entities/user.entity';

export interface IUserRepository {
  /**
   * 更新
   */
  save(user: User): Promise<void>;

  /**
   * 取得
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * 削除
   */
  delete(id: string): Promise<void>;

  /**
   * 存在確認
   */
  exists(id: string): Promise<boolean>;
}

export const UserRepositoryToken = Symbol('IUserRepository');
