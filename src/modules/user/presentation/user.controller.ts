import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { Message } from '../../shared/type';
import { CreateUserDTO } from '../application/dto/create-user.dto';
import { GetUserDTO } from '../application/dto/get-user-dto';
import { ReturnUserDTO } from '../application/dto/return-user.dto';
import { UpdateUserNameDTO } from '../application/dto/update-user.dto';
import { UserService } from '../application/use-cases/user.service';

@UseGuards(JWTGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 作成
   */
  @Post()
  async create(@Body() dto: CreateUserDTO): Promise<ReturnUserDTO> {
    return this.userService.create(dto);
  }

  /**
   * 更新
   */
  @Put()
  async updateUserName(@Body() dto: UpdateUserNameDTO): Promise<ReturnUserDTO> {
    return this.userService.changeName(dto);
  }

  /**
   * 取得
   */
  @Get()
  async findById(@Body() dto: GetUserDTO): Promise<ReturnUserDTO> {
    return this.userService.findById(dto.id);
  }

  /**
   * 削除
   */
  @Delete()
  async delete(@Body() dto: GetUserDTO): Promise<Message> {
    await this.userService.delete(dto.id);
    return { message: 'Successfully deleted!' };
  }
}
