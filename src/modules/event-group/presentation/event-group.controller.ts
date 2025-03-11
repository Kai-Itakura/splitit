import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { CurrentUserType } from 'src/modules/auth/decorators/types/current-user.type';
import { JWTGuard } from '../../auth/guards/jwt.guard';
import { CreateEventGroupUseCase } from '../application/use-cases/create-event-group.use-case';
import { GetAllGroupsUseCase } from '../application/use-cases/get-all-groups.use-case';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { EventGroupDto } from './dto/event-group.dto';

@UseGuards(JWTGuard)
@Controller('event-group')
export class EventGroupController {
  constructor(
    private readonly createEventGroupUseCase: CreateEventGroupUseCase,
    private readonly getAllGroupsUseCase: GetAllGroupsUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateEventGroupDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<{ message: string }> {
    await this.createEventGroupUseCase.execute(dto, user);
    return { message: 'Successfully created!' };
  }

  @Get()
  async getAllGroups(
    @CurrentUser() user: CurrentUserType,
  ): Promise<EventGroupDto[]> {
    return this.getAllGroupsUseCase.execute(user);
  }
}
