import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { SigninUseCase } from './application/use-cases/signin.use-case';
import { IAuthUserRepositoryToken } from './domain/repositories/auth-user.repository.interface';
import { IRefreshTokenRepositoryToken } from './domain/repositories/refresh-token.repository.interface';
import { AuthUserRepository } from './infrastructure/auth-user.repository';
import { RefreshTokenRepository } from './infrastructure/refresh-token.repository';
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
      provide: IRefreshTokenRepositoryToken,
      useClass: RefreshTokenRepository,
    },
    JwtStrategy,
    RefreshJwtStrategy,
    SigninUseCase,
    LoginUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
