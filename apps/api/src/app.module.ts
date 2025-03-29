import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    UserModule,
    EventGroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
