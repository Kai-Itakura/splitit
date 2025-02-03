import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  private readonly userDb: Prisma.UserDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.userDb = this.prismaService.user;
  }

  async create(email: string, hashedPassword: string): Promise<User> {
    return this.userDb.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
