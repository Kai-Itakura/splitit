import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventGroupUseCase } from '../application/use-cases/create-event-group.use-case';
import { EventGroupController } from './event-group.controller';

describe('EventGroupController', () => {
  let controller: EventGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventGroupController],
      providers: [CreateEventGroupUseCase],
    }).compile();

    controller = module.get<EventGroupController>(EventGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
