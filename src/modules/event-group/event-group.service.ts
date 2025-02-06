import { Injectable } from '@nestjs/common';
import { CreateEventGroupDto } from './dto/create-event-group.dto';
import { UpdateEventGroupDto } from './dto/update-event-group.dto';

@Injectable()
export class EventGroupService {
  create(_createEventGroupDto: CreateEventGroupDto) {
    console.log(
      '🔥 ~ EventGroupService ~ create ~ _createEventGroupDto:',
      _createEventGroupDto,
    );
    return 'This action adds a new eventGroup';
  }

  findAll() {
    return `This action returns all eventGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventGroup`;
  }

  update(id: number, _updateEventGroupDto: UpdateEventGroupDto) {
    console.log(
      '🔥 ~ EventGroupService ~ update ~ _updateEventGroupDto:',
      _updateEventGroupDto,
    );
    return `This action updates a #${id} eventGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventGroup`;
  }
}
