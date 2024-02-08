import { Module } from '@nestjs/common';

import { VoteResolver } from './vote.resolver';
import { PubSubHandler } from '../../pubSub/pubSubHandler';

@Module({
  imports: [],
  providers: [
    VoteResolver,
    {
      useValue: new PubSubHandler(),
      provide: 'PubSubHandler'
    }
  ],
})
export class VoteModule {}