import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrentUserType } from 'src/decorators/types/current-user.type';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { ReturnGroupDto } from '../../presentation/dto/return-event-group.dto';

@Injectable()
export class GetAllGroupsUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(user: CurrentUserType): Promise<ReturnGroupDto[]> {
    const eventGroups = await this.eventGroupRepository.findAll(user.userId);
    return eventGroups.map((group) =>
      plainToInstance(ReturnGroupDto, group, { strategy: 'excludeAll' }),
    );
  }
}
