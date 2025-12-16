import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { join } from 'path';
import { MailerServiceToken } from './application/interfaces/mailer.interface';
import { SendWelcomeMailUseCase } from './application/use-case/send-welcome-mail.use-case';
import { NodeMailerService } from './infrastructure/mail/node-mailer.service';
import { CreateUserEventHandler } from './presentation/event-handler/create-user.event-handler';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.getOrThrow<string>('MAILER_HOST'),
            port: Number(configService.getOrThrow<string>('MAILER_PORT')),
            auth: {
              user: configService.getOrThrow<string>('MAILER_USER'),
              pass: configService.getOrThrow<string>('MAILER_PASSWORD'),
            },
          },
          defaults: {
            from: `SplitIt <${configService.getOrThrow<string>('MAILER_FROM')}>`,
          },
          template: {
            dir: join(__dirname, 'presentation/view'),
            adapter: new ReactAdapter(),
          },
        };
      },
    }),
  ],
  providers: [
    CreateUserEventHandler,
    SendWelcomeMailUseCase,
    {
      provide: MailerServiceToken,
      useClass: NodeMailerService,
    },
  ],
})
export class MailModule {}
