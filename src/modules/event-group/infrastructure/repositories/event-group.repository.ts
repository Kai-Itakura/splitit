import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventGroup } from '../../domain/entities/event-group.entity';
import { Expense } from '../../domain/entities/expense.entity';
import { Settlement } from '../../domain/entities/settlement.entity';
import { IEventGroupRepository } from '../../domain/repositories/event-group.repository.interface';

@Injectable()
export class EventGroupRepository implements IEventGroupRepository {
  private readonly prismaEventGroup: Prisma.EventGroupDelegate;
  private readonly prismaUser: Prisma.UserDelegate;
  private readonly prismaExpense: Prisma.ExpenseDelegate;
  private readonly prismaSettlement: Prisma.SettlementDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.prismaEventGroup = prismaService.eventGroup;
    this.prismaUser = prismaService.user;
    this.prismaExpense = prismaService.expense;
    this.prismaSettlement = prismaService.settlement;
  }

  async save(eventGroup: EventGroup): Promise<void> {
    if (eventGroup.addedExpenseId) {
      const expense = eventGroup.getExpense(eventGroup.addedExpenseId);
      if (expense) {
        await this.addExpense(expense, eventGroup.settlements, eventGroup.id);
      }
    } else if (eventGroup.addedUserId) {
      await this.addUser(eventGroup.addedUserId, eventGroup.id);
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
        expenses: {
          select: {
            id: true,
            title: true,
            amount: true,
            payerId: true,
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
            isSettled: true,
          },
        },
      },
    });

    if (!group) throw new ForbiddenException('Event Group not Found!');

    const expenses = group.expenses.map((expense) => {
      return {
        ...expense,
        payeeIds: expense.payees.map((payee) => payee.id),
      };
    });

    return EventGroup.reconstruct(
      group.id,
      group.title,
      group.member.map((user) => user.id),
      group.currency,
      group.createdAt,
      expenses,
      group.settlements,
    );
  }

  async findAll(userId: string): Promise<EventGroup[]> {
    const user = await this.prismaUser.findUnique({
      where: {
        id: userId,
      },
      select: {
        eventGroups: {
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
            expenses: {
              select: {
                id: true,
                title: true,
                amount: true,
                payerId: true,
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
                isSettled: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.eventGroups || user.eventGroups.length === 0)
      throw new ForbiddenException('Event group not found!');

    const eventGroups = user.eventGroups;

    const eventGroupEntities = eventGroups.map((eventGroup) => {
      const expenses = eventGroup.expenses.map((expense) => {
        return {
          ...expense,
          payeeIds: expense.payees.map((payee) => payee.id),
        };
      });

      return EventGroup.reconstruct(
        eventGroup.id,
        eventGroup.title,
        eventGroup.member.map((member) => member.id),
        eventGroup.currency,
        eventGroup.createdAt,
        expenses,
        eventGroup.settlements,
      );
    });

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
          connect: eventGroup.memberIds.map((userId) => {
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

  private async addExpense(
    expense: Expense,
    settlements: Settlement[],
    groupId: string,
  ): Promise<void> {
    const createExpense = this.prismaExpense.create({
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

    const deleteAllSettlements = this.prismaSettlement.deleteMany({
      where: {
        groupId,
      },
    });

    const createSettlements = this.prismaSettlement.createMany({
      data: settlements.map((settlement) => {
        return {
          groupId,
          id: settlement.Id,
          payerId: settlement.payerId,
          payeeId: settlement.payeeId,
          amount: settlement.amount,
          isSettled: settlement.isSettled,
        };
      }),
    });

    await this.prismaService.$transaction([
      createExpense,
      deleteAllSettlements,
      createSettlements,
    ]);
  }

  private async addUser(userId: string, groupId: string): Promise<void> {
    await this.prismaEventGroup.update({
      where: {
        id: groupId,
      },
      data: {
        member: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
