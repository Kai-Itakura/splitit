export interface IProfileImageStorage {
  delete: (filename: string) => void;
}

export const ProfileImageStorageToken = Symbol('IProfileImageStorage');
