import { Module } from '@nestjs/common';

import { VoteResolver } from '@presentation/vote/vote.resolver';
import { PubSubHandler } from '@presentation/pubSub/pubSubHandler';

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