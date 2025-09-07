import { Id } from 'src/modules/shared/value-objects/id';
import { ProfileImage } from './profile-image.entity';

export class User {
  private constructor(
    private readonly _id: Id,
    private readonly _email: string,
    private _name: string,
    private image?: ProfileImage,
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

  get imageFilepath(): string | undefined {
    return this.image?.url;
  }

  /**
   * 再構築
   */
  static reconstruct(
    id: string,
    email: string,
    name: string,
    image?: {
      filename: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ): User {
    return new User(
      Id.reconstruct(id),
      email,
      name,
      image ? ProfileImage.reconstruct(image.filename, image.url) : undefined,
    );
  }

  /**
   * 名前の変更
   */
  changeName(newName: string): void {
    this._name = newName;
  }

  changeProfileImage(filename: string, path: string): void {
    this.image = new ProfileImage(filename, path);
  }
}
