import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IUserRepository } from '../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly prismaUser: Prisma.UserDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.prismaUser = this.prismaService.user;
  }

  async create(id: string, email: string, password: string): Promise<void> {
    try {
      await this.prismaUser.create({
        data: {
          id,
          email,
          password,
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
}
