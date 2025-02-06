import { Test, TestingModule } from '@nestjs/testing';
import { EventGroupService } from './event-group.service';

describe('EventGroupService', () => {
  let service: EventGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventGroupService],
    }).compile();

    service = module.get<EventGroupService>(EventGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
