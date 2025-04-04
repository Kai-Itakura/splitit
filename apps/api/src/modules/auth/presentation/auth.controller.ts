import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
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
  ): Promise<Message> {
    const tokenPair = await this.loginUseCase.execute(dto);

    this.setAuthCookie(res, tokenPair);

    return { message: 'Successfully login!' };
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response): { accessToken: string } {
    this.setAuthCookie(res, {
      accessToken: {
        value: '',
        expiresAt: new Date(),
      },
      refreshToken: {
        value: '',
        expiresAt: new Date(),
      },
    });
    return { accessToken: '' };
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @CurrentUser() currentUser: CurrentUserType,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Message> {
    const payload = { userId: currentUser.userId };
    const newTokenPair = await this.refreshTokenPairUseCase.execute(payload);

    this.setAuthCookie(res, newTokenPair);

    return { message: 'Successfully refresh token!' };
  }

  private setAuthCookie(res: Response, tokenPair: TokenPair): void {
    const accessCookieName =
      this.configService.getOrThrow<string>('ACCESS_COOKIE_NAME');
    const refreshCookieName = this.configService.getOrThrow<string>(
      'REFRESH_COOKIE_NAME',
    );

    const { accessToken, refreshToken } = tokenPair;
    res.cookie(accessCookieName, accessToken.value, {
      expires: accessToken.expiresAt,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    res.cookie(refreshCookieName, refreshToken.value, {
      expires: refreshToken.expiresAt,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/auth',
    });
  }
}
