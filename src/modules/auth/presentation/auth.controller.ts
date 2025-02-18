import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthDTO } from '../application/dto/auth.dto';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { SigninUseCase } from '../application/use-cases/signin.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinUseCase: SigninUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('signin')
  async signin(
    @Body() dto: AuthDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.signinUseCase.execute(dto);

    res.cookie('refresh_token', refreshToken.value, {
      maxAge: refreshToken.exp,
      httpOnly: true,
      secure: true,
      path: '/auth',
    });

    return { accessToken };
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDTO) {
    await this.loginUseCase.execute(dto);
  }
}
