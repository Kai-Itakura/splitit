import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ITokenGeneratorToken } from './application/interfaces/token-generator.interface';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RefreshTokenPairUseCase } from './application/use-cases/refresh-token-pair.use-case';
import { SigninUseCase } from './application/use-cases/signin.use-case';
import { IAuthUserRepositoryToken } from './domain/repositories/auth-user.repository.interface';
import { AuthUserRepository } from './infrastructure/repositories/auth-user.repository';
import { TokenGenerator } from './infrastructure/token/token-generator';
import { AuthController } from './presentation/auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshJwtStrategy } from './strategy/refresh.jwt.strategy';

@Module({
  imports: [JwtModule],
  providers: [
    PrismaService,
    {
      provide: IAuthUserRepositoryToken,
      useClass: AuthUserRepository,
    },
    {
      provide: ITokenGeneratorToken,
      useClass: TokenGenerator,
    },
    JwtStrategy,
    RefreshJwtStrategy,
    SigninUseCase,
    LoginUseCase,
    RefreshTokenPairUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
