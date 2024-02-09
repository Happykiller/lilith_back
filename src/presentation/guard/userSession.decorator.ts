import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserSession } from '@presentation/auth/jwt.strategy';
import common from '@presentation/common/common';

/* istanbul ignore next */
export const CurrentSession = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    
    const userSession: UserSession = common.getUseSessionFromContext(ctx.getContext());

    return userSession;
  },
);