import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { CurrentUserType } from '../../../decorators/types/current-user.type';
import { Message } from '../../../shared/presentation/dto/message.dto';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { RefreshTokenPairUseCase } from '../application/use-cases/refresh-token-pair.use-case';
import { SignupUseCase } from '../application/use-cases/signup.use-case';
import { UpdatePasswordUseCase } from '../application/use-cases/update-password.use-case';
import { JWTGuard } from '../guards/jwt.guard';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';
import { LoginAuthDto, SignupAuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenPair } from './dto/token-pair.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenPairUseCase: RefreshTokenPairUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
  ) {}

  @ApiException(() => [ConflictException])
  @Post('signup')
  async signup(@Body() dto: SignupAuthDto): Promise<Message> {
    await this.signupUseCase.execute(dto);
    return { message: 'Successfully Signup!' };
  }

  @ApiException(() => [NotFoundException])
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginAuthDto): Promise<TokenPair> {
    return this.loginUseCase.execute(dto);
  }

  @ApiException(() => [UnauthorizedException])
  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Body() _dto: RefreshTokenDto): TokenPair {
    return {
      accessToken: { value: '', expiresAt: new Date() },
      refreshToken: { value: '', expiresAt: new Date() },
    };
  }

  @ApiException(() => [UnauthorizedException, NotFoundException])
  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @CurrentUser() currentUser: CurrentUserType,
    @Body() _dto: RefreshTokenDto,
  ): Promise<TokenPair> {
    const payload = { userId: currentUser.userId };
    return this.refreshTokenPairUseCase.execute(payload);
  }

  @ApiException(() => [UnauthorizedException, NotFoundException])
  @UseGuards(JWTGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':userId/password')
  async updatePassword(
    @Param('userId') userId: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<Message> {
    await this.updatePasswordUseCase.execute(userId, dto);
    return { message: '🔑 Successfully change password!' };
  }
}
