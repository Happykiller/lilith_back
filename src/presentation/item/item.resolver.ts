import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { TokenGuard } from '@presentation/guard/token.guard';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { PubSubHandler } from '@presentation/pubSub/pubSubHandler';
import { ItemUsecaseModel } from '@usecase/item/model/item.usecase.model';
import { CurrentSession } from '@presentation/guard/userSession.decorator';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';
import { ItemResolverModel } from '@presentation/item/model/item.resolver.model';
import { UserResolverModel } from '@presentation/user/model/user.resolver.model';
import { CreateItemResolverDto } from '@presentation/item/dto/create.item.resolver.dto';
import { RevealItemResolverDto } from '@presentation/item/dto/reveal.item.resolver.dto';

@Resolver(of => ItemResolverModel)
export class ItemResolver {

  constructor(
    @Inject('PubSubHandler')
    private pubSubHandler: PubSubHandler
  ) {}

  @ResolveField(() => UserResolverModel)
  async author(@Parent() vote:ItemResolverModel):Promise<UserResolverModel> {
    const user:UserUsecaseModel = await inversify.getUserUsecase.execute({
      id: vote.author_id
    })
    return {
      id: user.id,
      code: user.code
    };
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => ItemResolverModel
  )
  async createItem(@CurrentSession() session: UserSession, @Args('dto') dto: CreateItemResolverDto): Promise<ItemResolverModel> {
    const item:ItemUsecaseModel = await inversify.createItemUsecase.execute({
      user_id: session.id,
      ...dto
    });
    await this.pubSubHandler.publish('refreshGame', { 
      game_id: dto.game_id,
      action: 'createItem' 
    });
    return item;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async reveal(@Args('dto') dto: RevealItemResolverDto): Promise<boolean> {
    await inversify.updateItemUsecase.execute({ 
      game_id: dto.game_id, 
      item_id: dto.item_id,
      state: 'REVEAL'
    });
    await this.pubSubHandler.publish('refreshGame', { 
      game_id: dto.game_id,
      action: 'reveal' 
    });
    return true;
  }

}