import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventGroup } from '../../domain/entities/event-group.entity';
import { IEventGroupRepository } from '../../domain/repositories/event-group.repository.interfece';
import { Currency } from '../../domain/value-objects/currency';

@Injectable()
export class EventGroupRepository implements IEventGroupRepository {
  private readonly prismaEventGroup: Prisma.EventGroupDelegate;
  private readonly prismaUser: Prisma.UserDelegate;

  constructor(prismaService: PrismaService) {
    this.prismaEventGroup = prismaService.eventGroup;
    this.prismaUser = prismaService.user;
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
        createdAt: eventGroup.createdAt,
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

  async findAll(userId: string): Promise<EventGroup[]> {
    const user = await this.prismaUser.findUnique({
      where: {
        id: userId,
      },
      select: {
        EventGroups: {
          select: {
            id: true,
            title: true,
            member: true,
            currency: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user || !user.EventGroups || user.EventGroups.length === 0)
      throw new ForbiddenException('Not found!');

    const eventGroups = user.EventGroups;
    const eventGroupEntities = eventGroups.map((eventGroup) =>
      EventGroup.reconstruct(
        eventGroup.id,
        eventGroup.title,
        eventGroup.member.map((member) => member.id),
        Currency.create(eventGroup.currency),
        eventGroup.createdAt,
      ),
    );

    return eventGroupEntities;
  }
}
