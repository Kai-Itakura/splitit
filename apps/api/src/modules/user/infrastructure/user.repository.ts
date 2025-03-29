import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { User } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly prismaUser: Prisma.UserDelegate;

  constructor(prismaService: PrismaService) {
    this.prismaUser = prismaService.user;
  }

  /**
   * ユーザーの更新
   */
  async save(user: User): Promise<void> {
    await this.prismaUser.update({
      where: { id: user.id },
      data: { name: user.name },
    });
  }

  /**
   * ユーザーの取得
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaUser.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return User.reconstruct(user.id, user.email, user.name ?? undefined);
  }

  /**
   * ユーザーの削除
   */
  async delete(id: string): Promise<void> {
    await this.prismaUser.delete({
      where: { id },
    });
  }

  /**
   * 存在確認
   */
  async exists(id: string): Promise<boolean> {
    const user = await this.prismaUser.findUnique({
      where: {
        id,
      },
    });

    return !!user;
  }
}
