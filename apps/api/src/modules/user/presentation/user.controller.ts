import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserType } from 'src/decorators/types/current-user.type';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { Message } from 'src/modules/shared/dto/message.dto';
import { FindByEmailUseCase } from '../application/use-cases/find-by-email.use-case';
import { FindByIdUserCase } from '../application/use-cases/find-by-id.use-case';
import { GetMeUseCase } from '../application/use-cases/get-me.use-case';
import { UploadImageUseCase } from '../application/use-cases/upload-image.use-case';
import { ReturnUserDTO } from './dto/return-user.dto';
import { UploadImageDto } from './dto/upload-image.dto';

@ApiTags('user')
@UseGuards(JWTGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly getMeUseCase: GetMeUseCase,
    private readonly findUserByIdUseCase: FindByIdUserCase,
    private readonly findUserByEmailUseCase: FindByEmailUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
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

  @ApiException(() => [
    UnauthorizedException,
    BadRequestException,
    UnprocessableEntityException,
  ])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post(':userId/image')
  async uploadImage(
    @Param('userId') userId: string,
    @Body() _dto: UploadImageDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024,
        })
        .addFileTypeValidator({
          fileType: /(jpe?g|png)$/i,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
  ): Promise<Message> {
    await this.uploadImageUseCase.execute(userId, image);
    return { message: 'Successfully profile image uploaded!' };
  }
}
