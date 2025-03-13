import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserRepositoryToken } from '../../domain/repositories/user.repository.interface';
import { UserRepository } from '../../infrastructure/user.repository';
import { FindByEmailUseCase } from './find-by-email.use-case';

describe('FindByEmailUseCase', () => {
  let service: FindByEmailUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByEmailUseCase,
        {
          provide: UserRepositoryToken,
          useClass: UserRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<FindByEmailUseCase>(FindByEmailUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
