export interface IMailerService {
  sendMail: (userName: string, email: string) => Promise<void>;
}

export const MailerServiceToken = Symbol('MailerService');
