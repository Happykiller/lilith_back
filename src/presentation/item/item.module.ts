import { Module } from '@nestjs/common';

import { ItemResolver } from './item.resolver';
import { PubSubHandler } from '../../pubSub/pubSubHandler';

@Module({
  imports: [],
  providers: [
    ItemResolver,
    {
      useValue: new PubSubHandler(),
      provide: 'PubSubHandler'
    }
  ],
})
export class ItemModule {}