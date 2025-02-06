import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IUserRepository } from '../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly prismaUser: Prisma.UserDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.prismaUser = this.prismaService.user;
  }

  async create(id: string, email: string, password: string): Promise<void> {
    await this.prismaUser.create({
      data: {
        id,
        email,
        password,
      },
    });
  }
}
