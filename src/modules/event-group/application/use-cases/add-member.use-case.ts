import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { EventGroupUserService } from '../../domain/services/event-group-user.service';

@Injectable()
export class AddMemberUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
    private readonly eventGroupUserService: EventGroupUserService,
  ) {}

  async execute(memberId: string, groupId: string): Promise<void> {
    const eventGroup = await this.eventGroupRepository.findById(groupId);

    // ユーザーが存在するか確認
    if (!(await this.eventGroupUserService.userExists(memberId)))
      throw new NotFoundException('User is not exist!');

    eventGroup.addMemberId(memberId);

    await this.eventGroupRepository.save(eventGroup);
  }
}
