import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AuthUserRepositoryToken,
  IAuthUserRepository,
} from '../../domain/repositories/auth-user.repository.interface';
import { UpdatePasswordDto } from '../../presentation/dto/update-password.dto';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(
    @Inject(AuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
  ) {}

  async execute(userId: string, dto: UpdatePasswordDto): Promise<void> {
    const authUser = await this.authUserRepository.findById(userId);
    if (!authUser) throw new NotFoundException('ユーザーが見つかりません。');

    await authUser.updatePassword(
      dto.newPassword,
      dto.confirmPassword,
      dto.oldPassword,
    );

    await this.authUserRepository.update(authUser);
  }
}
