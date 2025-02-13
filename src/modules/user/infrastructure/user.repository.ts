import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { User } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly prismaUser: Prisma.UserDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.prismaUser = this.prismaService.user;
  }

  /**
   * ユーザーの作成
   */
  async create(user: User): Promise<void> {
    try {
      await this.prismaUser.create({
        data: {
          id: user.id,
          email: user.email,
          password: user.passwordHash,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email is already used!');
        }
      }

      console.error(error);
      throw new Error();
    }
  }

  /**
   * ユーザーの更新
   */
  async update(user: User): Promise<void> {
    await this.prismaUser.update({
      where: { id: user.id },
      data: { password: user.passwordHash, name: user.name },
    });
  }

  /**
   * ユーザーの取得
   */
  async findById(id: string): Promise<User | null> {
    const user = await this.prismaUser.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return User.reconstitute(
      user.id,
      user.email,
      user.password,
      user.name ?? undefined,
    );
  }

  /**
   * ユーザーの削除
   */
  async delete(id: string): Promise<void> {
    await this.prismaUser.delete({
      where: { id },
    });
  }
}
