import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';

import { config } from '@src/config';
import inversify from '@src/inversify/investify';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { UserUsecaseModel } from '@src/usecase/model/user.usecase.model';

@Injectable()
export class TokenGuard implements CanActivate {

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | any | Promise<boolean | any> | Observable<boolean | any>> {
    try {
      const ctx = GqlExecutionContext.create(context);
      let authorization;
      let type;
      
      try {
        // From POST
        authorization = ctx.getContext().req.header('Authorization');
        type = 'POST';
      } catch(e) {
        if (ctx.getContext().req.connectionParams) {
          // From WS
          authorization = ctx.getContext().req.connectionParams['Authorization'];
          type = 'WS';
        } else {
          // From Playground
          authorization = ctx.getContext().req['Authorization'];
          type = 'PLAYGROUND';
        }
      }

      const accessToken = authorization.split('Bearer ')[1];

      if (!accessToken) throw new UnauthorizedException('Access token is not set');

      let userSession: UserSession;
      try {
        userSession = jwt.verify(accessToken, config.jwt.secret) as UserSession;
      } catch (err) {
        throw new UnauthorizedException('Token expired');
      }

      const user: UserUsecaseModel = await inversify.getUserUsecase.execute({
        id: userSession.id
      });

      if (!user) {
        throw new UnauthorizedException('User is not found');
      }

      if (type === 'POST') {
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