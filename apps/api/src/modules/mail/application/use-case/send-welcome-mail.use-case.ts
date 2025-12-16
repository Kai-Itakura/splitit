import { Inject, Injectable } from '@nestjs/common';
import {
  IMailerService,
  MailerServiceToken,
} from '../interfaces/mailer.interface';

@Injectable()
export class SendWelcomeMailUseCase {
  constructor(
    @Inject(MailerServiceToken) private readonly mailerService: IMailerService,
  ) {}

  async execute(userName: string, email: string): Promise<void> {
    await this.mailerService.sendMail(userName, email);
  }
}
