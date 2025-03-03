import { AuthUser } from '../entities/auth-user.entity';

export interface IAuthUserRepository {
  create(authUser: AuthUser): Promise<void>;
  findByEmail(email: string): Promise<AuthUser>;
  findById(id: string): Promise<AuthUser>;
  update(authUser: AuthUser): Promise<void>;
}

export const IAuthUserRepositoryToken = Symbol('IAuthUserRepository');
