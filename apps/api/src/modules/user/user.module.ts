import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { DeleteImageUseCase } from './application/use-cases/delete-image.use-case';
import { FindByEmailUseCase } from './application/use-cases/find-by-email.use-case';
import { FindByIdUserCase } from './application/use-cases/find-by-id.use-case';
import { GetMeUseCase } from './application/use-cases/get-me.use-case';
import { UploadImageUseCase } from './application/use-cases/upload-image.use-case';
import { ProfileImageStorageToken } from './domain/interfaces/profile-image.storage.interface';
import { UserRepositoryToken } from './domain/interfaces/user.repository.interface';
import { UserRepository } from './infrastructure/db/user.repository';
import { ProfileImageStorage } from './infrastructure/file/profile-image.strage';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          storage: diskStorage({
            destination: configService.getOrThrow('UPLOAD_DEST'),
            filename: (_req, file, cb) => {
              const randomSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              const nameTab = file.originalname.split('.');
              const originalName = nameTab.slice(0, -1).join('');
              const extension = nameTab[nameTab.length - 1];
              const filename = `${originalName}-${randomSuffix}.${extension}`;
              return cb(null, filename);
            },
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    { provide: UserRepositoryToken, useClass: UserRepository },
    { provide: ProfileImageStorageToken, useClass: ProfileImageStorage },
    PrismaService,
    FindByIdUserCase,
    FindByEmailUseCase,
    GetMeUseCase,
    UploadImageUseCase,
    DeleteImageUseCase,
  ],
})
export class UserModule {}
