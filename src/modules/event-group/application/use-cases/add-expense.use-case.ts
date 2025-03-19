import { Inject, Injectable } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { AddExpenseDto } from '../../presentation/dto/add-expense.dto';

@Injectable()
export class AddExpenseUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(dto: AddExpenseDto): Promise<void> {
    const groupUser = await this.eventGroupRepository.findById(dto.groupId);
    groupUser.addExpense(dto.title, dto.amount, dto.payerId, dto.payeeIds);
    await this.eventGroupRepository.save(groupUser);
  }
}
