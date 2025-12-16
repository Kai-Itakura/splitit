import { Id } from '../value-objects/id';

export type DomainEventBody = Record<string, unknown>;

export abstract class DomainEvent<T extends DomainEventBody = DomainEventBody> {
  readonly id: string;
  readonly occurredOn: Date;

  constructor(
    readonly name: string,
    readonly body: T,
  ) {
    this.id = Id.create().value;
    this.occurredOn = new Date();
  }
}
