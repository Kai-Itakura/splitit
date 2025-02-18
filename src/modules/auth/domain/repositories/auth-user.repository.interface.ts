import { AuthUser } from '../entities/auth-user.entity';

export interface IAuthUserRepository {
  create(authUser: AuthUser): Promise<void>;
  findByEmail(id: string): Promise<AuthUser>;
}

export const IAuthUserRepositoryToken = Symbol('IAuthUserRepository');
