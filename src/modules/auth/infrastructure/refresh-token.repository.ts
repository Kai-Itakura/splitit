import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { RefreshToken } from '../domain/entities/refresh-token.entity';
import { IRefreshTokenRepository } from '../domain/repositories/refresh-token.repository.interface';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  private readonly prismaRefreshToken: Prisma.RefreshTokenDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.prismaRefreshToken = prismaService.refreshToken;
  }

  async create(refreshToken: RefreshToken): Promise<void> {
    await this.prismaRefreshToken.create({
      data: {
        id: refreshToken.id,
        token: refreshToken.token,
        expiresAt: refreshToken.expiresAt,
        used: refreshToken.used,
        userId: refreshToken.userId,
      },
    });
  }
}
