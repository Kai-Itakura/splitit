import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserType } from 'src/decorators/types/current-user.type';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { GetUserUseCase } from '../application/get-user.use-case';
import { FindByEmailUseCase } from '../application/use-cases/find-by-email.use-case';
import { FindUserDTO } from './dto/get-user.dto';
import { ReturnUserDTO } from './dto/return-user.dto';

@ApiTags('user')
@UseGuards(JWTGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly findUserByEmailUseCase: FindByEmailUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @ApiException(() => [NotFoundException])
  @Get()
  async getUser(
    @CurrentUser() currentUser: CurrentUserType,
  ): Promise<ReturnUserDTO> {
    return this.getUserUseCase.execute(currentUser.userId);
  }

  @Post()
  async findByEmail(@Body() dto: FindUserDTO): Promise<ReturnUserDTO> {
    return this.findUserByEmailUseCase.execute(dto);
  }
}
