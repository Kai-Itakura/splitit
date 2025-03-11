import { EventGroup } from '../entities/event-group.entity';

export interface IEventGroupRepository {
  save(eventGroup: EventGroup): Promise<void>;
  findAll(userId: string): Promise<EventGroup[]>;
}

export const EventGroupRepositoryToken = Symbol('IEventGroupRepository');
