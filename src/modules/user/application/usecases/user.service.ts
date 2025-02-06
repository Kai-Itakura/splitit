import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async create(dto: CreateUserDTO): Promise<User> {
    // Entity生成
    const newUser = await User.create(dto.email, dto.password);
    // 永続化
    await this.userRepository.create(
      newUser.id,
      newUser.email,
      newUser.passwordHash,
    );

    return newUser;
  }
}
