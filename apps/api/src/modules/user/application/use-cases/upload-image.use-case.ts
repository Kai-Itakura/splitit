import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IUserRepository,
  UserRepositoryToken,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UploadImageUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(userId: string, image: Express.Multer.File) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found!');

    user.changeProfileImage(
      image.filename,
      this.configService.getOrThrow('UPLOAD_DEST'),
    );

    await this.userRepository.save(user);
  }
}
