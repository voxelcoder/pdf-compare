import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthenticatedUserType } from '../../prisma/services/user/types/authenticated-user.type';

export const GraphQLUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUserType => {
    const gqlContext = GqlExecutionContext.create(ctx).getContext();
    const request = gqlContext.req as Request;
    return request && (request.user as AuthenticatedUserType);
  },
);
