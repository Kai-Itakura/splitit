import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { EventGroupModule } from './modules/event-group/event-group.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.evn.db.develop'],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..'),
    }),
    UserModule,
    EventGroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
