import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventGroup } from '../../domain/entities/event-group.entity';
import { Expense } from '../../domain/entities/expense.entity';
import { IEventGroupRepository } from '../../domain/repositories/event-group.repository.interface';

@Injectable()
export class EventGroupRepository implements IEventGroupRepository {
  private readonly prismaEventGroup: Prisma.EventGroupDelegate;
  private readonly prismaUser: Prisma.UserDelegate;
  private readonly prismaExpense: Prisma.ExpenseDelegate;

  constructor(prismaService: PrismaService) {
    this.prismaEventGroup = prismaService.eventGroup;
    this.prismaUser = prismaService.user;
    this.prismaExpense = prismaService.expense;
  }

  async save(eventGroup: EventGroup): Promise<void> {
    if (eventGroup.addedExpenseId) {
      const expense = eventGroup.getExpense(eventGroup.addedExpenseId);
      if (expense) {
        await this.addExpense(expense, eventGroup.id);
      }
    } else {
      await this.saveEventGroup(eventGroup);
    }
  }

  async findById(groupId: string): Promise<EventGroup> {
    const group = await this.prismaEventGroup.findUnique({
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
          },
        },
      },
    });

    if (!group) throw new ForbiddenException('Event Group not Found!');

    return EventGroup.reconstruct(
      group.id,
      group.title,
      group.member.map((user) => user.id),
      group.currency,
      group.createdAt,
    );
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
      throw new ForbiddenException('Event group not found!');

    const eventGroups = user.EventGroups;
    const eventGroupEntities = eventGroups.map((eventGroup) =>
      EventGroup.reconstruct(
        eventGroup.id,
        eventGroup.title,
        eventGroup.member.map((member) => member.id),
        eventGroup.currency,
        eventGroup.createdAt,
      ),
    );

    return eventGroupEntities;
  }

  private async saveEventGroup(eventGroup: EventGroup): Promise<void> {
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

  private async addExpense(expense: Expense, groupId: string): Promise<void> {
    await this.prismaExpense.create({
      data: {
        id: expense.id,
        title: expense.title,
        amount: expense.amount,
        payerId: expense.payerId,
        payees: {
          connect: expense.payeeIds.map((payeeId) => {
            return {
              id: payeeId,
            };
          }),
        },
        groupId: groupId,
      },
    });
  }
}
