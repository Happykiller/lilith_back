import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { SessionResolver } from './session.resolver';
import { TokenGuard } from '../guard/token.guard';
import { PubSubHandler } from '../../pubSub/pubSubHandler';

@Module({
  imports: [],
  providers: [
    SessionResolver,
    {
      useValue: new PubSubHandler(),
      provide: 'PubSubHandler'
    }
  ],
})
export class SessionModule {}