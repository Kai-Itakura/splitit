import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { CurrentUserType } from 'src/modules/auth/decorators/types/current-user.type';
import { JWTGuard } from '../../auth/guards/jwt.guard';
import { EventGroupDetailDto } from '../application/query-service/dto/event-group-detail-dto';
import { AddExpenseUseCase } from '../application/use-cases/add-expense.use-case';
import { CreateEventGroupUseCase } from '../application/use-cases/create-event-group.use-case';
import { GetAllGroupsUseCase } from '../application/use-cases/get-all-groups.use-case';
import { getGroupUseCase } from '../application/use-cases/get-group.use-case';
import { AddExpenseDto } from './dto/add-expense.dto';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { EventGroupDto } from './dto/event-group.dto';

@UseGuards(JWTGuard)
@Controller('event-group')
export class EventGroupController {
  constructor(
    private readonly createEventGroupUseCase: CreateEventGroupUseCase,
    private readonly getGroupUseCase: getGroupUseCase,
    private readonly getAllGroupsUseCase: GetAllGroupsUseCase,
    private readonly addExpenseUseCase: AddExpenseUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateEventGroupDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<{ message: string }> {
    await this.createEventGroupUseCase.execute(dto, user);
    return { message: 'Successfully created!' };
  }

  @Get(':groupId')
  async getGroup(
    @Param('groupId') groupId: string,
  ): Promise<EventGroupDetailDto> {
    return this.getGroupUseCase.execute(groupId);
  }

  @Get()
  async getAllGroups(
    @CurrentUser() user: CurrentUserType,
  ): Promise<EventGroupDto[]> {
    return this.getAllGroupsUseCase.execute(user);
  }

  @Post('expense-record')
  async addExpense(@Body() dto: AddExpenseDto): Promise<{ message: string }> {
    await this.addExpenseUseCase.execute(dto);
    return { message: 'Successfully add expense record!' };
  }
}
