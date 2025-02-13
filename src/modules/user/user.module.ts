import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserService } from './application/use-cases/user.service';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUserRepository, useClass: UserRepository },
    PrismaService,
  ],
})
export class UserModule {}
