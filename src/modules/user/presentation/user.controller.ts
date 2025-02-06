import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO } from '../application/dto/create-user.dto';
import { ReturnUserDTO } from '../application/dto/return-user.dto';
import { UserService } from '../application/usecases/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDTO): Promise<ReturnUserDTO> {
    const newUser = await this.userService.create(dto);
    return plainToInstance(ReturnUserDTO, newUser);
  }
}
