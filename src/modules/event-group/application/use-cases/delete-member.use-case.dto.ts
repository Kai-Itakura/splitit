import { Inject, Injectable } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';

@Injectable()
export class DeleteMemberUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(memberId: string, groupId: string) {
    const eventGroup = await this.eventGroupRepository.findById(groupId);
    eventGroup.removeMemberId(memberId);
    await this.eventGroupRepository.save(eventGroup);
  }
}
