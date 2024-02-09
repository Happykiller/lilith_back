import { SkipThrottle } from '@nestjs/throttler';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { TokenGuard } from '@presentation/guard/token.guard';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { PubSubHandler } from '@src/presentation/pubSub/pubSubHandler';
import { GameUsecaseModel } from '@usecase/game/model/game.usecase.model';
import { CurrentSession } from '@presentation/guard/userSession.decorator';
import { GameResolverModel } from '@presentation/game/model/game.resolver.model';
import { GetGameResolverDto } from '@presentation/game/dto/get.game.resolver.dto';
import { JoinGameResolverDto } from '@presentation/game/dto/join.game.resolver.dto';
import { CreateGameResolverDto } from '@presentation/game/dto/create.game.resolver.dto';
import common from '../common/common';

@Resolver('GameResolver')
export class GameResolver {

  constructor(
    @Inject('PubSubHandler')
    private pubSubHandler: PubSubHandler
  ) {}

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    (): typeof GameResolverModel => GameResolverModel
  )
  async createGame(@CurrentSession() session: UserSession, @Args('dto') dto: CreateGameResolverDto): Promise<GameResolverModel> {
    const game:GameUsecaseModel = await inversify.createGameUsecase.execute({
      name: dto.name,
      voting: dto.voting,
      user_id: session.id
    });
    await this.pubSubHandler.publish('refreshGame', {
      game_id: game.id,
      action: 'createGame' 
    });
    return game;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async joinGame(@CurrentSession() session: UserSession, @Args('dto') dto: JoinGameResolverDto): Promise<boolean> {
    const game:GameResolverModel = await inversify.joinGameUsecase.execute({   
      game_id: dto.game_id,
      user_id: session.id
    });
    await this.pubSubHandler.publish('refreshGame', {
      game_id: dto.game_id,
      action: 'joinGame' 
    });
    return true;
  }

  @UseGuards(TokenGuard)
  @Query(
    /* istanbul ignore next */
    () => GameResolverModel
  )
  async game(@CurrentSession() session: UserSession, @Args('dto') dto: GetGameResolverDto): Promise<GameResolverModel> {
    return await inversify.getGameUsecase.execute({ 
      ... dto,
      user_id: session.id
     });
  }

  @UseGuards(TokenGuard)
  @Query(
    /* istanbul ignore next */
    () => [GameResolverModel]
  )
  async games(@CurrentSession() session: UserSession): Promise<GameResolverModel[]> {
    return await inversify.getAllGameUsecase.execute({ 
      user_id: session.id
     });
  }

  @SkipThrottle()
  @UseGuards(TokenGuard)
  @Subscription(
    /* istanbul ignore next */
    (): [typeof GameResolverModel] => [GameResolverModel], {
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        const userSession: UserSession = common.getUseSessionFromContext(context);
        return await inversify.getAllGameUsecase.execute({ 
          user_id: userSession.id
         });
      }
    })
  /* istanbul ignore next */
  async subToGames() {
    return this.pubSubHandler.asyncIterator('refreshGame');
  }

  @SkipThrottle()
  @UseGuards(TokenGuard)
  @Subscription(
    /* istanbul ignore next */
    (): typeof GameResolverModel => GameResolverModel, 
    {
      filter: (payload, variables) => {
        return payload.game_id === variables.dto.game_id;
      },
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        const userSession: UserSession = common.getUseSessionFromContext(context);
        return await inversify.getGameUsecase.execute({ 
          game_id: args.dto.game_id,
          user_id: userSession.id
         });
      }
    })
  /* istanbul ignore next */
  async subToGame(@Args('dto') dto: GetGameResolverDto) {
    return this.pubSubHandler.asyncIterator('refreshGame');
  }
}