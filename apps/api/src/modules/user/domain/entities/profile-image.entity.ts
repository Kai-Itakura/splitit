import path from 'path';

export class ProfileImage {
  constructor(
    private readonly _filename: string,
    private readonly _path: string,
  ) {}

  get url() {
    return path.join(this._path, this._filename);
  }

  static reconstruct(filename: string, path: string): ProfileImage {
    return new ProfileImage(filename, path);
  }
}
