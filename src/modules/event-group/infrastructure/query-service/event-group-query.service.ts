import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventGroupDetailDto } from '../../application/query-service/dto/event-group-detail-dto';
import { IEventGroupQueryService } from '../../application/query-service/event-group-query.service.interface';

@Injectable()
export class EventGroupQueryService implements IEventGroupQueryService {
  private readonly prismaEventGroup: Prisma.EventGroupDelegate;

  constructor(prismaService: PrismaService) {
    this.prismaEventGroup = prismaService.eventGroup;
  }

  async findByGroupId(groupId: string): Promise<EventGroupDetailDto | null> {
    return this.prismaEventGroup.findUnique({
      where: {
        id: groupId,
      },
      select: {
        id: true,
        title: true,
        currency: true,
        createdAt: true,
        member: {
          select: {
            id: true,
            name: true,
          },
        },
        expenses: {
          select: {
            id: true,
            title: true,
            payer: {
              select: {
                name: true,
              },
            },
            payees: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }
}
