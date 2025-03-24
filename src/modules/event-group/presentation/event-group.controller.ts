import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { CurrentUserType } from 'src/modules/auth/decorators/types/current-user.type';
import { Message } from 'src/modules/types/response-message.type';
import { JWTGuard } from '../../auth/guards/jwt.guard';
import { EventGroupDetailDto } from '../application/query-service/dto/event-group-detail-dto';
import { AddExpenseUseCase } from '../application/use-cases/add-expense.use-case';
import { AddMemberUseCase } from '../application/use-cases/add-member.use-case';
import { CreateEventGroupUseCase } from '../application/use-cases/create-event-group.use-case';
import { DeleteEventGroupUseCase } from '../application/use-cases/delete-event-group.use-case';
import { GetAllGroupsUseCase } from '../application/use-cases/get-all-groups.use-case';
import { getGroupUseCase } from '../application/use-cases/get-group.use-case';
import { UpdateExpenseUseCase } from '../application/use-cases/update-expense.use-case';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { EventGroupDto } from './dto/event-group.dto';
import { ExpenseDto } from './dto/expense.dto';

@UseGuards(JWTGuard)
@Controller('event-group')
export class EventGroupController {
  constructor(
    private readonly createEventGroupUseCase: CreateEventGroupUseCase,
    private readonly getGroupUseCase: getGroupUseCase,
    private readonly getAllGroupsUseCase: GetAllGroupsUseCase,
    private readonly deleteEventGroupUseCase: DeleteEventGroupUseCase,
    private readonly addExpenseUseCase: AddExpenseUseCase,
    private readonly updateExpenseUseCase: UpdateExpenseUseCase,
    private readonly addMemberUseCase: AddMemberUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateEventGroupDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<Message> {
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

  @Post(':groupId')
  async deleteGroup(@Param('groupId') groupId: string): Promise<Message> {
    await this.deleteEventGroupUseCase.execute(groupId);
    return { message: 'Successfully deleted!' };
  }

  @Post(':groupId/expense-record')
  async addExpense(
    @Body() dto: ExpenseDto,
    @Param('groupId') groupId: string,
  ): Promise<Message> {
    await this.addExpenseUseCase.execute(dto, groupId);
    return { message: 'Successfully add expense record!' };
  }

  @Put(':groupId/expense-record/:expenseId')
  async updateExpense(
    @Body() dto: ExpenseDto,
    @Param('groupId') groupId: string,
    @Param('expenseId') expenseId: string,
  ): Promise<Message> {
    await this.updateExpenseUseCase.execute(dto, groupId, expenseId);
    return { message: 'Successfully update expense record!' };
  }

  @Post('member')
  async addMember(@Body() dto: AddMemberDto): Promise<Message> {
    await this.addMemberUseCase.execute(dto);
    return { message: 'Successfully add member!' };
  }
}
