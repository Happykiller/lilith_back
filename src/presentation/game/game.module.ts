import { Module } from '@nestjs/common';

import { GameResolver } from './game.resolver';
import { PubSubHandler } from '../../pubSub/pubSubHandler';

@Module({
  imports: [],
  providers: [
    GameResolver,
    {
      useValue: new PubSubHandler(),
      provide: 'PubSubHandler'
    }
  ],
})
export class GameModule {}