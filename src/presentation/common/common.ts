import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { UserSession } from '@presentation/auth/jwt.strategy';

import { config } from '@src/config';

class Common {
  getUseSessionFromContext(dto:any): UserSession {
    let authorization;
    let type;
    try {
      // From POST
      type = 'POST';
      authorization = dto.req.header('Authorization');
    } catch(e) {
      if (dto.req.connectionParams) {
        type = 'WS';
        // From WS
        authorization = dto.req.connectionParams['Authorization'];
      } else {
        type = 'PLAYGROUND';
        // From Playground
        authorization = dto.req['Authorization'];
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

    userSession.type = type;

    return userSession;
  }
}

const common = new Common();

export default common;