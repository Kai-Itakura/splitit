import { PartialType } from '@nestjs/mapped-types';
import { CreateEventGroupDto } from './create-event-group.dto';

export class UpdateEventGroupDto extends PartialType(CreateEventGroupDto) {}
