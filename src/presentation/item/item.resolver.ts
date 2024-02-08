import { SkipThrottle } from '@nestjs/throttler';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType, Query, Resolver, Subscription } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { PubSubHandler } from '@src/pubSub/pubSubHandler';
import { TokenGuard } from '@src/presentation/guard/token.guard';
import { ItemResolverModel } from './model/item.resolver.model';
import { UserSession } from '../auth/jwt.strategy';
import { CurrentSession } from '../guard/userSession.decorator';
import { CreateItemResolverDto } from './dto/create.item.resolver.dto';
import { ItemUsecaseModel } from '../../usecase/item/model/item.usecase.model';
import { RevealItemResolverDto } from './dto/reveal.item.resolver.dto';

@Resolver('ItemResolver')
export class ItemResolver {

  constructor(
    @Inject('PubSubHandler')
    private pubSubHandler: PubSubHandler
  ) {}

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => ItemResolverModel
  )
  async createItem(@CurrentSession() session: UserSession, @Args('dto') dto: CreateItemResolverDto): Promise<ItemResolverModel> {
    const item:ItemUsecaseModel = await inversify.createItemUsecase.execute({
      user_code: session.code,
      ...dto
    });
    return item;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async reveal(@Args('dto') dto: RevealItemResolverDto): Promise<boolean> {
    const item:ItemResolverModel = await inversify.updateItemUsecase.execute({ 
      game_id: dto.game_id, 
      item_id: dto.item_id,
      state: 'REVEAL'
    });
    await this.pubSubHandler.publish('refreshGame', { 
      gameId: dto.game_id,
      action: 'reveal' 
    });
    return true;
  }

}