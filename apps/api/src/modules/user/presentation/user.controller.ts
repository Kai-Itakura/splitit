import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserType } from 'src/decorators/types/current-user.type';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { FindByEmailUseCase } from '../application/use-cases/find-by-email.use-case';
import { FindByIdUserCase } from '../application/use-cases/find-by-id.use-case';
import { GetMeUseCase } from '../application/use-cases/get-me.use-case';
import { ReturnUserDTO } from './dto/return-user.dto';

@ApiTags('user')
@UseGuards(JWTGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly getMeUseCase: GetMeUseCase,
    private readonly findUserByIdUseCase: FindByIdUserCase,
    private readonly findUserByEmailUseCase: FindByEmailUseCase,
  ) {}

  @ApiException(() => [NotFoundException])
  @Get('me')
  async getMe(
    @CurrentUser() currentUser: CurrentUserType,
  ): Promise<ReturnUserDTO> {
    return this.getMeUseCase.execute(currentUser.userId);
  }

  @ApiException(() => [UnauthorizedException, NotFoundException])
  @Get(':userId')
  async findById(@Param('userId') userId: string): Promise<ReturnUserDTO> {
    return this.findUserByIdUseCase.execute(userId);
  }

  @ApiException(() => [UnauthorizedException, NotFoundException])
  @Get()
  async findByEmail(@Query('email') email: string): Promise<ReturnUserDTO> {
    return this.findUserByEmailUseCase.execute(email);
  }
}
