import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createEventGroupUseCase } from './application/use-cases/create-event-group.use-case';
import { EventGroupRepositoryToken } from './domain/repositories/event-group.repository.interfece';
import { EventGroupRepository } from './infrastructure/repositories/event-group.repository';
import { EventGroupController } from './presentation/event-group.controller';

@Module({
  controllers: [EventGroupController],
  providers: [
    PrismaService,
    {
      provide: EventGroupRepositoryToken,
      useClass: EventGroupRepository,
    },
    createEventGroupUseCase,
  ],
})
export class EventGroupModule {}
