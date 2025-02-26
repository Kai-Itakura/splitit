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

  constructor(private readonly _prismaService: PrismaService) {
    this.prismaUser = _prismaService.user;
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
    });

    if (!authUser) throw new ForbiddenException('User not found!');

    return AuthUser.reconstruct(authUser.id, authUser.email, authUser.password);
  }
}
