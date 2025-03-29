import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { FindByEmailUseCase } from '../application/use-cases/find-by-email.use-case';
import { FindUserDTO } from './dto/get-user-dto';
import { ReturnUserDTO } from './dto/return-user.dto';

@UseGuards(JWTGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly findUserByEmailUseCase: FindByEmailUseCase) {}

  @Post()
  async findByEmail(@Body() dto: FindUserDTO): Promise<ReturnUserDTO> {
    return this.findUserByEmailUseCase.execute(dto);
  }
}
