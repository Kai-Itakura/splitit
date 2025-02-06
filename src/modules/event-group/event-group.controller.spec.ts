import { Test, TestingModule } from '@nestjs/testing';
import { EventGroupController } from './event-group.controller';
import { EventGroupService } from './event-group.service';

describe('EventGroupController', () => {
  let controller: EventGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventGroupController],
      providers: [EventGroupService],
    }).compile();

    controller = module.get<EventGroupController>(EventGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
