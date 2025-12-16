import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IDomainEventPublisher } from 'src/shared/application/event/domain-event.publisher.interface';
import { DomainEvent } from '../../domain/event/domain-event';

@Injectable()
export class DomainEventPublisher implements IDomainEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(event: DomainEvent): void {
    this.eventEmitter.emit(event.name, event);
  }
}
