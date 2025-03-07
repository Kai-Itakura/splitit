import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { currentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { CurrentUser } from 'src/modules/auth/decorators/types/current-user.type';
import { JWTGuard } from '../../auth/guards/jwt.guard';
import { createEventGroupUseCase } from '../application/use-cases/create-event-group.use-case';
import { CreateEventGroupDto } from './dto/create-event-group.dto';

@Controller('event-group')
export class EventGroupController {
  constructor(
    private readonly createEventGroupUseCase: createEventGroupUseCase,
  ) {}

  @UseGuards(JWTGuard)
  @Post()
  async create(
    @Body() dto: CreateEventGroupDto,
    @currentUser() user: CurrentUser,
  ): Promise<{ message: string }> {
    await this.createEventGroupUseCase.execute(dto, user);
    return { message: 'Successfully created!' };
  }
}
