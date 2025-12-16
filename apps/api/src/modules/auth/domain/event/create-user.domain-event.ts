import { DomainEvent } from 'src/shared/domain/event/domain-event';

type CreateUserDomainEventBody = {
  userName: string;
  email: string;
};

export const CREATE_USER_DOMAIN_EVENT_NAME = 'user.create';

export class CreateUserDomainEvent extends DomainEvent<CreateUserDomainEventBody> {
  constructor(body: CreateUserDomainEventBody) {
    super(CREATE_USER_DOMAIN_EVENT_NAME, body);
  }
}
