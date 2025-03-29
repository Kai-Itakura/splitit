import { Inject, Injectable } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';

@Injectable()
export class DeleteEventGroupUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(groupId: string): Promise<void> {
    await this.eventGroupRepository.delete(groupId);
  }
}
