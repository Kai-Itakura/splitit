import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { FindByEmailUseCase } from './application/use-cases/find-by-email.use-case';
import { UserRepositoryToken } from './domain/repositories/user.repository.interface';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    { provide: UserRepositoryToken, useClass: UserRepository },
    PrismaService,
    FindByEmailUseCase,
  ],
})
export class UserModule {}
