import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { EventGroupDetailDto } from '../query-service/dto/event-group-detail-dto';
import {
  EventGroupQueryServiceToken,
  IEventGroupQueryService,
} from '../query-service/event-group-query.service.interface';

@Injectable()
export class getGroupUseCase {
  constructor(
    @Inject(EventGroupQueryServiceToken)
    private readonly eventGroupQueryService: IEventGroupQueryService,
  ) {}

  async execute(groupId: string): Promise<EventGroupDetailDto> {
    const group = await this.eventGroupQueryService.findByGroupId(groupId);
    if (!group) throw new ForbiddenException('Group not found!');
    return group;
  }
}
