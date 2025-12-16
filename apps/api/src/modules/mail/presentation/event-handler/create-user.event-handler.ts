import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  CREATE_USER_DOMAIN_EVENT_NAME,
  CreateUserDomainEvent,
} from 'src/modules/auth/domain/event/create-user.domain-event';
import { SendWelcomeMailUseCase } from '../../application/use-case/send-welcome-mail.use-case';

@Injectable()
export class CreateUserEventHandler {
  constructor(
    private readonly sendWelcomeMailUseCase: SendWelcomeMailUseCase,
  ) {}

  @OnEvent(CREATE_USER_DOMAIN_EVENT_NAME)
  async handler(event: CreateUserDomainEvent) {
    await this.sendWelcomeMailUseCase.execute(
      event.body.userName,
      event.body.email,
    );
    console.log('✉️ ウェルカムメールを送信しました。');
  }
}
