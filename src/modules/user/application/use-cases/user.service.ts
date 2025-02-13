import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ReturnUserDTO } from '../dto/return-user.dto';
import { UpdateUserNameDTO } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  /**
   * ユーザーを作成する
   */
  async create(dto: CreateUserDTO): Promise<ReturnUserDTO> {
    // Entity生成
    const newUser = await User.create(dto);
    // 永続化
    await this.userRepository.create(newUser);

    return plainToInstance(ReturnUserDTO, newUser);
  }

  /**
   * ユーザー名を変更する
   */
  async changeName(dto: UpdateUserNameDTO): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findById(dto.id);

    if (!user) {
      throw new ForbiddenException('User not found!');
    }

    user.changeName(dto.name);

    await this.userRepository.update(user);

    return plainToInstance(ReturnUserDTO, user);
  }

  /**
   * ユーザーを取得する
   */
  async findById(id: string): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ForbiddenException('User not found!');
    }

    return plainToInstance(ReturnUserDTO, user);
  }

  /**
   * ユーザーを削除する
   */
  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
