import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getTotalExpense } from '@prisma/client/sql';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventGroupDetailDto } from '../../application/query-service/dto/event-group-detail.dto';
import { IEventGroupQueryService } from '../../application/query-service/event-group-query.service.interface';

@Injectable()
export class EventGroupQueryService implements IEventGroupQueryService {
  private readonly prismaEventGroup: Prisma.EventGroupDelegate;
  private readonly prismaExpense: Prisma.ExpenseDelegate;

  constructor(private prismaService: PrismaService) {
    this.prismaEventGroup = prismaService.eventGroup;
    this.prismaExpense = prismaService.expense;
  }

  async findByGroupId(groupId: string): Promise<EventGroupDetailDto | null> {
    const totalExpense = await this.prismaService.$queryRawTyped(
      getTotalExpense(groupId),
    );
    console.log(
      '🔥 ~ EventGroupQueryService ~ findByGroupId ~ totalExpense:',
      totalExpense,
    );
    const eventGroup = await this.prismaEventGroup.findUnique({
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
            amount: true,
            payer: {
              select: {
                id: true,
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
        settlements: {
          select: {
            id: true,
            payeeId: true,
            payerId: true,
            amount: true,
          },
        },
      },
    });

    return eventGroup;
  }
}
