import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { IProfileImageStorage } from '../../domain/interfaces/profile-image.storage.interface';

@Injectable()
export class ProfileImageStorage implements IProfileImageStorage {
  delete(filename: string) {
    fs.unlinkSync(filename);
  }
}
