import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';

import { config } from '@src/config';
import inversify from '@src/inversify/investify';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { UserUsecaseModel } from '@src/usecase/user/model/user.usecase.model';
import common from '../common/common';

@Injectable()
export class TokenGuard implements CanActivate {

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | any | Promise<boolean | any> | Observable<boolean | any>> {
    try {
      const ctx = GqlExecutionContext.create(context);

      const userSession: UserSession = common.getUseSessionFromContext(ctx.getContext());

      const user: UserUsecaseModel = await inversify.getUserUsecase.execute({
        id: userSession.id
      });

      if (!user) {
        throw new UnauthorizedException('User is not found');
      }

      if (userSession.type === 'POST') {
        const refreshToken: string = jwt.sign(
          {
            code: userSession.code,
            id: userSession.id
          },
          config.jwt.secret,
          {
            expiresIn: config.jwt.signOptions.expiresIn
          }
        );
  
        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token is not create');
        }

        ctx.getContext().res.header(config.jwt.refreshTokenName, refreshToken);
      }
  
      return true;
    } catch(e) {
      throw new UnauthorizedException(e.message);
    }
  }
}