import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from './types/current-user.type';

export const currentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): CurrentUser | undefined => {
    const request: Request = context.switchToHttp().getRequest();
    return request.user as CurrentUser;
  },
);
