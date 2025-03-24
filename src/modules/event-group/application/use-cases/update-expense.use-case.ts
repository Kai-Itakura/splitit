import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { ExpenseDto } from '../../presentation/dto/expense.dto';

@Injectable()
export class UpdateExpenseUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(
    dto: ExpenseDto,
    groupId: string,
    expenseId: string,
  ): Promise<void> {
    const eventGroup = await this.eventGroupRepository.findById(groupId);
    if (!eventGroup) throw new NotFoundException('Event group not found!');

    eventGroup.updateExpense(
      expenseId,
      dto.title,
      dto.amount,
      dto.payerId,
      dto.payeeIds,
    );

    await this.eventGroupRepository.save(eventGroup);
  }
}
