import { Module } from '@nestjs/common';

import { SessionResolver } from './session.resolver';
import { PubSubHandler } from '../pubSub/pubSubHandler';

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