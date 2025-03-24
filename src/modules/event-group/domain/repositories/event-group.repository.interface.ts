import { EventGroup } from '../entities/event-group.entity';

export interface IEventGroupRepository {
  save(eventGroup: EventGroup): Promise<void>;
  findById(groupId: string): Promise<EventGroup>;
  findAll(userId: string): Promise<EventGroup[]>;
  delete(groupId: string): Promise<void>;
}

export const EventGroupRepositoryToken = Symbol('IEventGroupRepository');
