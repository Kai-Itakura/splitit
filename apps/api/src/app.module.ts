import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { EventGroupModule } from './modules/event-group/event-group.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { DomainEventModule } from './shared/infrastructure/event/domain-event.module';
@Module({
  imports: [
    DomainEventModule,
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
    MailModule,
  ],
})
export class AppModule {}
