import { Module } from '@nestjs/common';

import { ItemResolver } from '@presentation/item/item.resolver';
import { PubSubHandler } from '@presentation/pubSub/pubSubHandler';

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