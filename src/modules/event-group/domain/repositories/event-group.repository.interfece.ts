import { EventGroup } from '../entities/event-group.entity';

export interface IEventGroupRepository {
  save(eventGroup: EventGroup): Promise<void>;
}

export const EventGroupRepositoryToken = Symbol('IEventGroupRepository');
