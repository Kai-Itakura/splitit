import { User } from '../entities/user.entity';

export interface IUserRepository {
  save(user: User): Promise<void>;

  findById(userId: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  delete(id: string): Promise<void>;

  exists(id: string): Promise<boolean>;
}

export const UserRepositoryToken = Symbol('IUserRepository');
