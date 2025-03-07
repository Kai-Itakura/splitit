import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventGroup } from '../../domain/entities/event-group.entity';
import { IEventGroupRepository } from '../../domain/repositories/event-group.repository.interfece';

@Injectable()
export class EventGroupRepository implements IEventGroupRepository {
  private readonly prismaEventGroup: Prisma.EventGroupDelegate;

  constructor(prismaService: PrismaService) {
    this.prismaEventGroup = prismaService.eventGroup;
  }

  async save(eventGroup: EventGroup): Promise<void> {
    await this.prismaEventGroup.upsert({
      where: {
        id: eventGroup.id,
      },
      create: {
        id: eventGroup.id,
        title: eventGroup.title,
        currency: eventGroup.currency,
        member: {
          connect: eventGroup.userIds.map((userId) => {
            return { id: userId };
          }),
        },
      },
      update: {
        title: eventGroup.title,
        currency: eventGroup.currency,
      },
    });
  }
}
