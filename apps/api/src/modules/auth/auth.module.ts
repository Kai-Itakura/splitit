import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../shared/infrastructure/database/prisma/prisma.service';
import { TokenGeneratorToken } from './application/interfaces/token-generator.interface';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RefreshTokenPairUseCase } from './application/use-cases/refresh-token-pair.use-case';
import { SignupUseCase } from './application/use-cases/signup.use-case';
import { UpdatePasswordUseCase } from './application/use-cases/update-password.use-case';
import { AuthUserRepositoryToken } from './domain/repositories/auth-user.repository.interface';
import { AuthUserRepository } from './infrastructure/repositories/auth-user.repository';
import { TokenGenerator } from './infrastructure/token/token-generator';
import { AuthController } from './presentation/auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: AuthUserRepositoryToken,
      useClass: AuthUserRepository,
    },
    {
      provide: TokenGeneratorToken,
      useClass: TokenGenerator,
    },
    JwtStrategy,
    SignupUseCase,
    LoginUseCase,
    RefreshTokenPairUseCase,
    UpdatePasswordUseCase,
  ],
})
export class AuthModule {}
