import { Inject, Injectable } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { ExpenseDto } from '../../presentation/dto/expense.dto';

@Injectable()
export class AddExpenseUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(dto: ExpenseDto, groupId: string): Promise<void> {
    const groupUser = await this.eventGroupRepository.findById(groupId);
    groupUser.addExpense(dto.title, dto.amount, dto.payerId, dto.payeeIds);
    await this.eventGroupRepository.save(groupUser);
  }
}
