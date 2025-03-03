import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDTO } from '../application/dto/auth.dto';
import { TokenPair } from '../application/interfaces/token-generator.interface';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { SigninUseCase } from '../application/use-cases/signin.use-case';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinUseCase: SigninUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('signin')
  async signin(@Body() dto: AuthDTO): Promise<{ message: string }> {
    await this.signinUseCase.execute(dto);
    return { message: 'Successfully Signin!' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const newTokenPair = await this.loginUseCase.execute(dto);

    this.setAuthCookie(res, newTokenPair.refreshToken);

    return { accessToken: newTokenPair.accessToken.value };
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request) {}

  @Post('refresh')
  async refresh(@Req() req: Request) {}

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
