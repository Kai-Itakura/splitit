import { Inject, Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/decorators/types/current-user.type';
import { EventGroup } from '../../domain/entities/event-group.entity';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interfece';
import { CreateEventGroupDto } from '../../presentation/dto/create-event-group.dto';

@Injectable()
export class createEventGroupUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(dto: CreateEventGroupDto, user: CurrentUser): Promise<void> {
    const eventGroup = EventGroup.create(dto.title, user.userId, dto.currency);
    await this.eventGroupRepository.save(eventGroup);
  }
}
