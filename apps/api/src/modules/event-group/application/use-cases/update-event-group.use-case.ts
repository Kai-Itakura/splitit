import { Inject, Injectable } from '@nestjs/common';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { EventGroupDto } from '../../presentation/dto/event-group.dto';

@Injectable()
export class UpdateEventGroupUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(dto: EventGroupDto, groupId: string): Promise<void> {
    const eventGroup = await this.eventGroupRepository.findById(groupId);
    eventGroup.title = dto.title;
    eventGroup.changeCurrency(dto.currency);
    await this.eventGroupRepository.save(eventGroup);
  }
}
