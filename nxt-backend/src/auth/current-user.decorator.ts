import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface CurrentAuthUser {
  id: string;
  email: string;
  name: string;
}

export interface RequestWithAuthUser extends Request {
  authUser: CurrentAuthUser;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): CurrentAuthUser => {
    return ctx.switchToHttp().getRequest<RequestWithAuthUser>().authUser;
  },
);
