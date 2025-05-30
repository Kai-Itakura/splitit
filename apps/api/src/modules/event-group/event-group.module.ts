import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepositoryToken } from '../user/domain/repositories/user.repository.interface';
import { UserRepository } from '../user/infrastructure/user.repository';
import { EventGroupQueryServiceToken } from './application/query-service/event-group-query.service.interface';
import { AddExpenseUseCase } from './application/use-cases/add-expense.use-case';
import { AddMemberUseCase } from './application/use-cases/add-member.use-case';
import { CreateEventGroupUseCase } from './application/use-cases/create-event-group.use-case';
import { DeleteEventGroupUseCase } from './application/use-cases/delete-event-group.use-case';
import { DeleteExpenseUseCase } from './application/use-cases/delete-expense.use-case.ts';
import { DeleteMemberUseCase } from './application/use-cases/delete-member.use-case.dto';
import { GetAllGroupsUseCase } from './application/use-cases/get-all-groups.use-case';
import { getGroupUseCase } from './application/use-cases/get-group.use-case';
import { UpdateEventGroupUseCase } from './application/use-cases/update-event-group.use-case';
import { UpdateExpenseUseCase } from './application/use-cases/update-expense.use-case';
import { EventGroupRepositoryToken } from './domain/repositories/event-group.repository.interface';
import { EventGroupUserService } from './domain/services/event-group-user.service';
import { EventGroupQueryService } from './infrastructure/query-service/event-group.query.service';
import { EventGroupRepository } from './infrastructure/repositories/event-group.repository';
import { EventGroupController } from './presentation/event-group.controller';

@Module({
  controllers: [EventGroupController],
  providers: [
    PrismaService,
    {
      provide: EventGroupRepositoryToken,
      useClass: EventGroupRepository,
    },
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: EventGroupQueryServiceToken,
      useClass: EventGroupQueryService,
    },
    CreateEventGroupUseCase,
    UpdateEventGroupUseCase,
    getGroupUseCase,
    GetAllGroupsUseCase,
    DeleteMemberUseCase,
    DeleteEventGroupUseCase,
    AddExpenseUseCase,
    UpdateExpenseUseCase,
    DeleteExpenseUseCase,
    AddMemberUseCase,
    EventGroupUserService,
  ],
})
export class EventGroupModule {}
