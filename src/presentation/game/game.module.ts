import { Module } from '@nestjs/common';

import { GameResolver } from '@presentation/game/game.resolver';
import { PubSubHandler } from '@presentation/pubSub/pubSubHandler';

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