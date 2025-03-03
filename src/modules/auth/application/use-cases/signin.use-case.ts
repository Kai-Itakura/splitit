import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import {
  IAuthUserRepository,
  IAuthUserRepositoryToken,
} from '../../domain/repositories/auth-user.repository.interface';
import { AuthDTO } from '../dto/auth.dto';

export interface JwtPayload {
  id: string;
}

@Injectable()
export class SigninUseCase {
  constructor(
    @Inject(IAuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
  ) {}

  async execute(dto: AuthDTO): Promise<void> {
    // ユーザーの新規作成
    const authUser = await AuthUser.create(dto.email, dto.password);
    await this.authUserRepository.create(authUser);
  }
}
