import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProfileImageStorage,
  ProfileImageStorageToken,
} from '../../domain/interfaces/profile-image.storage.interface';
import {
  IUserRepository,
  UserRepositoryToken,
} from '../../domain/interfaces/user.repository.interface';

@Injectable()
export class DeleteImageUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(ProfileImageStorageToken)
    private readonly profileImageStorage: IProfileImageStorage,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.imageFilepath) {
      throw new NotFoundException();
    }
    const imagePath = user.imageFilepath;
    user.deleteProfileImage();
    await this.userRepository.save(user);
    this.profileImageStorage.delete(imagePath);
  }
}
