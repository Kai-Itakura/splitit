import { DomainEvent } from 'src/shared/domain/event/domain-event';

export interface IDomainEventPublisher {
  publish: (event: DomainEvent) => void;
}

export const DomainEventPublisherToken = Symbol('DomainEventPublisher');
