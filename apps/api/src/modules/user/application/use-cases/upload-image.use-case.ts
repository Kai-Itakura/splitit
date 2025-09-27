import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IProfileImageStorage,
  ProfileImageStorageToken,
} from '../../domain/interfaces/profile-image.storage.interface';
import {
  IUserRepository,
  UserRepositoryToken,
} from '../../domain/interfaces/user.repository.interface';

@Injectable()
export class UploadImageUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(ProfileImageStorageToken)
    private readonly profileImageStorage: IProfileImageStorage,
    private readonly configService: ConfigService,
  ) {}

  async execute(userId: string, image: Express.Multer.File) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    if (user.imageFilepath) {
      this.profileImageStorage.delete(user.imageFilepath);
    }

    user.changeProfileImage(
      image.filename,
      this.configService.getOrThrow('UPLOAD_DEST'),
    );

    await this.userRepository.save(user);
  }
}
