import { EventGroupDetailDto } from './dto/event-group-detail.dto';

export interface IEventGroupQueryService {
  findByGroupId(groupId: string): Promise<EventGroupDetailDto | null>;
}

export const EventGroupQueryServiceToken = Symbol('IEventGroupQueryService');
