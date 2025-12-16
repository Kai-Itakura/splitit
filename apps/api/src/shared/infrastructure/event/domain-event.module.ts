import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DomainEventPublisherToken } from '../../application/event/domain-event.publisher.interface';
import { DomainEventPublisher } from './domain-event.publisher';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot({ global: true })],
  providers: [
    {
      provide: DomainEventPublisherToken,
      useClass: DomainEventPublisher,
    },
  ],
  exports: [DomainEventPublisherToken],
})
export class DomainEventModule {}
