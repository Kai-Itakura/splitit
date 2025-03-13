import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUserType } from './types/current-user.type';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): CurrentUserType | undefined => {
    const request: Request = context.switchToHttp().getRequest();
    return request.user as CurrentUserType;
  },
);
