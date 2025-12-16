import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/infrastructure/database/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly prismaUser: Prisma.UserDelegate;
  private readonly prismaProfileImage: Prisma.ProfileImageDelegate;

  constructor(prismaService: PrismaService) {
    this.prismaUser = prismaService.user;
    this.prismaProfileImage = prismaService.profileImage;
  }

  async save(user: User): Promise<void> {
    await this.prismaUser.update({
      where: { id: user.id },
      data: { name: user.name },
    });

    if (user.imageFilepath) {
      await this.prismaProfileImage.upsert({
        where: {
          userId: user.id,
        },
        create: {
          userId: user.id,
          url: user.imageFilepath,
        },
        update: {
          url: user.imageFilepath,
        },
      });
    } else {
      const profileImage = await this.prismaProfileImage.findUnique({
        where: { userId: user.id },
      });
      if (!profileImage) return;
      await this.prismaProfileImage.delete({
        where: {
          userId: user.id,
        },
      });
    }
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prismaUser.findUnique({
      where: { id: userId },
    });

    const profileImage = await this.prismaProfileImage.findUnique({
      where: {
        userId,
      },
    });

    return user
      ? User.reconstruct(
          user.id,
          user.email,
          user.name,
          profileImage ? { url: profileImage.url } : undefined,
        )
      : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaUser.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return User.reconstruct(user.id, user.email, user.name);
  }

  async delete(id: string): Promise<void> {
    await this.prismaUser.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const user = await this.prismaUser.findUnique({
      where: {
        id,
      },
    });

    return !!user;
  }
}
