import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  async login(@Body() dto: LoginAuthDto): Promise<TokenPair> {
    return this.loginUseCase.execute(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(): TokenPair {
    return {
      accessToken: { value: '', expiresAt: new Date() },
      refreshToken: { value: '', expiresAt: new Date() },
    };
  }

  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @CurrentUser() currentUser: CurrentUserType,
  ): Promise<TokenPair> {
    const payload = { userId: currentUser.userId };
    return this.refreshTokenPairUseCase.execute(payload);
  }
}
