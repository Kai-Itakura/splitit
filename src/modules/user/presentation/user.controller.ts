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

  // /**
  //  * 作成
  //  */
  // @Post()
  // async create(@Body() dto: CreateUserDTO): Promise<ReturnUserDTO> {
  //   return this.userService.create(dto);
  // }

  // /**
  //  * 更新
  //  */
  // @Put()
  // async updateUserName(@Body() dto: UpdateUserNameDTO): Promise<ReturnUserDTO> {
  //   return this.userService.changeName(dto);
  // }

  // /**
  //  * 取得
  //  */
  // @Get()
  // async findById(@Body() dto: GetUserDTO): Promise<ReturnUserDTO> {
  //   return this.userService.findById(dto.id);
  // }

  // /**
  //  * 削除
  //  */
  // @Delete()
  // async delete(@Body() dto: GetUserDTO): Promise<Message> {
  //   await this.userService.delete(dto.id);
  //   return { message: 'Successfully deleted!' };
  // }
}
