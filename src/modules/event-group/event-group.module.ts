import { Module } from '@nestjs/common';
import { EventGroupService } from './event-group.service';
import { EventGroupController } from './event-group.controller';

@Module({
  controllers: [EventGroupController],
  providers: [EventGroupService],
})
export class EventGroupModule {}
