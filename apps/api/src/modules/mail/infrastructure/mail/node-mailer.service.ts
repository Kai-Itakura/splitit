import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailerService } from '../../application/interfaces/mailer.interface';

@Injectable()
export class NodeMailerService implements IMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(userName: string, email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'テスト',
      template: 'welcome-mail',
      context: { userName },
    });
  }
}
