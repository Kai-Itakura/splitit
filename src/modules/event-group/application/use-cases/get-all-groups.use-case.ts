import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrentUserType } from 'src/modules/auth/decorators/types/current-user.type';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interfece';
import { EventGroupDto } from '../../presentation/dto/event-group.dto';

@Injectable()
export class GetAllGroupsUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(user: CurrentUserType): Promise<EventGroupDto[]> {
    const eventGroups = await this.eventGroupRepository.findAll(user.userId);
    return eventGroups.map((group) => plainToInstance(EventGroupDto, group));
  }
}
