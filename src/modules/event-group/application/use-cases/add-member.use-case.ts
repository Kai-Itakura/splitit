import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { EventGroupUserService } from '../../domain/services/event-group-user.service';
import { AddMemberDto } from '../../presentation/dto/add-member.dto';

@Injectable()
export class AddMemberUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
    private readonly eventGroupUserService: EventGroupUserService,
  ) {}

  async execute(dto: AddMemberDto): Promise<void> {
    const eventGroup = await this.eventGroupRepository.findById(dto.groupId);

    // ユーザーが存在するか確認
    if (!(await this.eventGroupUserService.userExists(dto.userId)))
      throw new NotFoundException('User is not exist!');

    eventGroup.addMemberId(dto.userId);

    await this.eventGroupRepository.save(eventGroup);
  }
}
