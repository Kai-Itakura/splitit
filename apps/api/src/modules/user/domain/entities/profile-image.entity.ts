import path from 'path';

export class ProfileImage {
  private constructor(private readonly _url: string) {}

  get url() {
    return this._url;
  }

  static create(filename: string, filepath: string) {
    const url = path.join(filepath, filename);
    return new ProfileImage(url);
  }

  static reconstruct(url: string): ProfileImage {
    return new ProfileImage(url);
  }
}
