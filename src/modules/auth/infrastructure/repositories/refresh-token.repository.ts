import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { RefreshToken } from '../../domain/entities/refresh-token.entity';
import { IRefreshTokenRepository } from '../../domain/repositories/refresh-token.repository.interface';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  private readonly prismaRefreshToken: Prisma.RefreshTokenDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.prismaRefreshToken = prismaService.refreshToken;
  }

  async create(token: RefreshToken): Promise<void> {
    await this.prismaRefreshToken.create({
      data: {
        id: token.id,
        token: token.token,
        expiresAt: token.expiresAt,
        used: token.used,
        userId: token.userId,
      },
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prismaRefreshToken.findUnique({
      where: { token },
    });

    if (!refreshToken) return null;

    return RefreshToken.reconstruct(
      refreshToken.id,
      refreshToken.token,
      refreshToken.expiresAt,
      refreshToken.used,
      refreshToken.userId,
    );
  }

  async delete(token: string): Promise<void> {
    await this.prismaRefreshToken.delete({
      where: { token },
    });
  }
}
