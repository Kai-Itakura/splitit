import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { FindByEmailUseCase } from './application/use-cases/find-by-email.use-case';
import { FindByIdUserCase } from './application/use-cases/find-by-id.use-case';
import { GetMeUseCase } from './application/use-cases/get-me.use-case';
import { UserRepositoryToken } from './domain/repositories/user.repository.interface';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    { provide: UserRepositoryToken, useClass: UserRepository },
    PrismaService,
    FindByIdUserCase,
    FindByEmailUseCase,
    GetMeUseCase,
  ],
})
export class UserModule {}
