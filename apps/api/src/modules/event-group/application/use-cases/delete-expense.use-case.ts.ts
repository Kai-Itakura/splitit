import { Inject, Injectable } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';

@Injectable()
export class DeleteExpenseUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(eventId: string, expenseId: string): Promise<void> {
    const eventGroup = await this.eventGroupRepository.findById(eventId);
    eventGroup.deleteExpense(expenseId);
    await this.eventGroupRepository.save(eventGroup);
  }
}
