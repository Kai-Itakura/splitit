export interface IUserRepository {
  create(id: string, email: string, hashedPassword: string): Promise<void>;
}

export const IUserRepository = Symbol('IUserRepository');
