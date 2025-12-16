import { DomainEvent } from './domain-event';

export abstract class DomainEventStorable {
  protected events: DomainEvent[];

  constructor() {
    this.events = [];
  }

  public addEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  public pullEvents(): DomainEvent[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }
}
