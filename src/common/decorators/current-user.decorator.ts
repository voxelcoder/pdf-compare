import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUserType } from '../../prisma/services/user/types/authenticated-user.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUserType => {
    const httpContext = ctx.switchToHttp();
    const request = httpContext.getRequest<Request>();
    return request && (request.user as AuthenticatedUserType);
  },
);
