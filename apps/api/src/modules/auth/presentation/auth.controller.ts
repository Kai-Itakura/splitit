import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Message } from 'src/modules/types/response-message.type';
import { TokenPair } from '../application/interfaces/token-generator.interface';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { RefreshTokenPairUseCase } from '../application/use-cases/refresh-token-pair.use-case';
import { SignupUseCase } from '../application/use-cases/signup.use-case';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserType } from '../decorators/types/current-user.type';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';
import { LoginAuthDto, SignupAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenPairUseCase: RefreshTokenPairUseCase,
  ) {}

  @Post('signup')
  async signup(@Body() dto: SignupAuthDto): Promise<Message> {
    await this.signupUseCase.execute(dto);
    return { message: 'Successfully Signup!' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const tokenPair = await this.loginUseCase.execute(dto);

    this.setAuthCookie(res, tokenPair.refreshToken);

    return { accessToken: tokenPair.accessToken.value };
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response): { accessToken: string } {
    this.setAuthCookie(res, { value: '', expiresAt: new Date() });
    return { accessToken: '' };
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @CurrentUser() currentUser: CurrentUserType,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const payload = { userId: currentUser.userId };
    const newTokenPair = await this.refreshTokenPairUseCase.execute(payload);

    this.setAuthCookie(res, newTokenPair.refreshToken);

    return { accessToken: newTokenPair.accessToken.value };
  }

  private setAuthCookie(
    res: Response,
    refreshToken: TokenPair['refreshToken'],
  ): void {
    res.cookie('refresh_token', refreshToken.value, {
      expires: refreshToken.expiresAt,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/auth',
    });
  }
}
