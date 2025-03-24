import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { EventGroup } from '../../domain/entities/event-group.entity';
import { Expense } from '../../domain/entities/expense.entity';
import { Settlement } from '../../domain/entities/settlement.entity';
import { IEventGroupRepository } from '../../domain/repositories/event-group.repository.interface';

@Injectable()
export class EventGroupRepository implements IEventGroupRepository {
  private readonly prismaEventGroup: Prisma.EventGroupDelegate;
  private readonly prismaUser: Prisma.UserDelegate;

  constructor(private readonly prismaService: PrismaService) {
    this.prismaEventGroup = prismaService.eventGroup;
    this.prismaUser = prismaService.user;
  }

  async save(eventGroup: EventGroup): Promise<void> {
    await this.prismaService.$transaction(async (tx) => {
      const existingEventGroup = await tx.eventGroup.findUnique({
        where: {
          id: eventGroup.id,
        },
        select: {
          id: true,
          member: {
            select: {
              id: true,
            },
          },
        },
      });

      // イベントグループの保存
      await this.saveEventGroup(tx.eventGroup, eventGroup, existingEventGroup);

      if (existingEventGroup) {
        // 費用の保存
        await this.saveExpenses(
          tx.expense,
          eventGroup.expenses,
          existingEventGroup.id,
        );

        // 精算記録の保存
        await this.saveSettlements(
          tx.settlement,
          eventGroup.settlements,
          eventGroup.id,
        );
      }
    });
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

    const expenses = group.expenses.map((expense) => ({
      ...expense,
      payeeIds: expense.payees.map((payee) => payee.id),
    }));

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
      const expenses = eventGroup.expenses.map((expense) => ({
        ...expense,
        payeeIds: expense.payees.map((payee) => payee.id),
      }));

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

  private async saveEventGroup(
    eventGroupDelegate: Prisma.EventGroupDelegate,
    eventGroup: EventGroup,
    existingEventGroup: { id: string; member: Pick<User, 'id'>[] } | null,
  ): Promise<void> {
    if (existingEventGroup) {
      // 更新
      const existingMemberIds = existingEventGroup.member.map(
        (user) => user.id,
      );
      const memberIdsToDelete = existingMemberIds.filter(
        (existingMemberId) => !eventGroup.memberIds.includes(existingMemberId),
      );
      const memberIdsToAdd = eventGroup.memberIds.filter(
        (memberId) => !existingMemberIds.includes(memberId),
      );
      await eventGroupDelegate.update({
        where: {
          id: eventGroup.id,
        },
        data: {
          title: eventGroup.title,
          currency: eventGroup.currency,
          member: {
            disconnect: memberIdsToDelete.map((memberId) => ({ id: memberId })),
            connect: memberIdsToAdd.map((memberId) => ({ id: memberId })),
          },
        },
      });
    } else {
      // 新規作成
      await eventGroupDelegate.create({
        data: {
          id: eventGroup.id,
          title: eventGroup.title,
          currency: eventGroup.currency,
          createdAt: eventGroup.createdAt,
          member: {
            connect: eventGroup.memberIds.map((userId) => ({ id: userId })),
          },
        },
      });
    }
  }

  /**
   * 費用の新規作成or更新or削除
   */
  private async saveExpenses(
    expenseDelegate: Prisma.ExpenseDelegate,
    newExpenses: Expense[],
    groupId: string,
  ): Promise<void> {
    const existingExpenses = await expenseDelegate.findMany({
      where: {
        groupId,
      },
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
    });

    const existingExpenseIds = existingExpenses.map(
      (existingExpense) => existingExpense.id,
    );

    // 新規作成
    const expenseToCreate = newExpenses.find(
      (newExpense) => !existingExpenseIds.includes(newExpense.id),
    );
    if (expenseToCreate) {
      await expenseDelegate.create({
        data: {
          id: expenseToCreate.id,
          title: expenseToCreate.title,
          amount: expenseToCreate.amount,
          payerId: expenseToCreate.payerId,
          payees: {
            connect: expenseToCreate.payeeIds.map((payeeId) => ({
              id: payeeId,
            })),
          },
          groupId,
        },
      });
    }

    // 更新
    const expensesToUpdate = newExpenses.filter((newExpense) =>
      existingExpenseIds.includes(newExpense.id),
    );
    if (expensesToUpdate.length > 0) {
      await Promise.all(
        expensesToUpdate.map((expense) => {
          const existingPayeeIds = existingExpenses
            .find((existingExpense) => existingExpense.id === expense.id)!
            .payees.map((payee) => payee.id);
          const newPayeeIds = expense.payeeIds;

          return expenseDelegate.update({
            where: {
              id: expense.id,
            },
            data: {
              title: expense.title,
              amount: expense.amount,
              payerId: expense.payerId,
              payees: {
                disconnect: existingPayeeIds.map((payeeId) => ({
                  id: payeeId,
                })),
                connect: newPayeeIds.map((payeeId) => ({ id: payeeId })),
              },
            },
          });
        }),
      );
    }

    // 削除
    const expenseIdsToDelete = existingExpenseIds.filter(
      (expenseId) =>
        !newExpenses.some((newExpense) => newExpense.id === expenseId),
    );
    if (expenseIdsToDelete.length > 0) {
      await expenseDelegate.deleteMany({
        where: {
          id: {
            in: expenseIdsToDelete,
          },
        },
      });
    }
  }

  private async saveSettlements(
    settlementDelegate: Prisma.SettlementDelegate,
    settlements: Settlement[],
    groupId: string,
  ) {
    const existingSettlements = await settlementDelegate.findMany({
      where: {
        groupId,
      },
    });

    // 新規作成
    const settlementsToCreate = settlements.filter(
      (settlement) =>
        !existingSettlements
          .map((existingSettlement) => existingSettlement.id)
          .includes(settlement.id),
    );
    if (settlementsToCreate.length > 0) {
      await settlementDelegate.createMany({
        data: settlementsToCreate.map((settlement) => ({
          id: settlement.id,
          amount: settlement.amount,
          payeeId: settlement.payeeId,
          payerId: settlement.payerId,
          isSettled: settlement.isSettled,
          groupId,
        })),
      });
    }

    // 更新
    const settlementsToUpdate = settlements.filter((settlement) =>
      existingSettlements
        .map((existingSettlement) => existingSettlement.id)
        .includes(settlement.id),
    );
    if (settlementsToUpdate.length > 0) {
      await Promise.all(
        settlementsToUpdate.map((settlement) => {
          return settlementDelegate.update({
            where: {
              id: settlement.id,
            },
            data: {
              amount: settlement.amount,
              payerId: settlement.payerId,
              payeeId: settlement.payeeId,
              isSettled: settlement.isSettled,
            },
          });
        }),
      );
    }

    // 削除
    const settlementIdsToDelete = existingSettlements
      .map((settlement) => settlement.id)
      .filter(
        (existingSettlementId) =>
          !settlements
            .map((settlement) => settlement.id)
            .includes(existingSettlementId),
      );
    await settlementDelegate.deleteMany({
      where: {
        id: {
          in: settlementIdsToDelete,
        },
      },
    });
  }
}
