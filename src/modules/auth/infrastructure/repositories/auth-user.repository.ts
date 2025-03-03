import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { IAuthUserRepository } from '../../domain/repositories/auth-user.repository.interface';

@Injectable()
export class AuthUserRepository implements IAuthUserRepository {
  private readonly prismaUser: Prisma.UserDelegate;
  private readonly prismaRefreshToken: Prisma.RefreshTokenDelegate;

  constructor(prismaService: PrismaService) {
    this.prismaUser = prismaService.user;
    this.prismaRefreshToken = prismaService.refreshToken;
  }

  async create(authUser: AuthUser): Promise<void> {
    try {
      await this.prismaUser.create({
        data: {
          id: authUser.id,
          email: authUser.email,
          password: authUser.passwordHash,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already used!');
      }
    }
  }

  async findByEmail(email: string): Promise<AuthUser> {
    const authUser = await this.prismaUser.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        refreshTokens: {
          select: {
            id: true,
            token: true,
            expiresAt: true,
          },
        },
      },
    });

    if (!authUser) throw new ForbiddenException('User not found!');

    return AuthUser.reconstruct(
      authUser.id,
      authUser.email,
      authUser.password,
      authUser.refreshTokens,
    );
  }

  async findById(id: string): Promise<AuthUser> {
    const authUser = await this.prismaUser.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: true,
        refreshTokens: {
          select: {
            id: true,
            token: true,
            expiresAt: true,
          },
        },
      },
    });

    if (!authUser) throw new ForbiddenException('User not found!');

    return AuthUser.reconstruct(
      authUser.id,
      authUser.email,
      authUser.password,
      authUser.refreshTokens,
    );
  }

  async update(authUser: AuthUser): Promise<void> {
    if (authUser.allRefreshTokensRemoved) {
      await this.prismaRefreshToken.deleteMany({
        where: {
          userId: authUser.id,
        },
      });
    } else if (authUser.newRefreshToken) {
      await this.prismaRefreshToken.create({
        data: {
          id: authUser.newRefreshToken.id,
          token: authUser.newRefreshToken.value,
          expiresAt: authUser.newRefreshToken.expiresAt,
          userId: authUser.id,
        },
      });
    } else if (authUser.removedRefreshTokenId) {
      await this.prismaRefreshToken.delete({
        where: {
          id: authUser.removedRefreshTokenId,
        },
      });
    } else {
      await this.prismaUser.update({
        where: {
          id: authUser.id,
        },
        data: {
          email: authUser.email,
          password: authUser.passwordHash,
        },
      });
    }
  }
}
