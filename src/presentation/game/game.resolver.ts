import { SkipThrottle } from '@nestjs/throttler';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType, Query, Resolver, Subscription } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { PubSubHandler } from '@src/pubSub/pubSubHandler';
import { TokenGuard } from '@src/presentation/guard/token.guard';
import { GameUsecaseModel } from '../../usecase/game/model/game.usecase.model';
import { GameResolverModel } from './model/game.resolver.model';
import { CreateGameResolverDto } from './dto/create.game.resolver.dto';
import { JoinGameResolverDto } from './dto/join.game.resolver.dto';
import { UserSession } from '../auth/jwt.strategy';
import { CurrentSession } from '../guard/userSession.decorator';
import { GetGameResolverDto } from './dto/get.game.resolver.dto';

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
  async createGame(@Args('dto') dto: CreateGameResolverDto): Promise<GameResolverModel> {
    const game:GameUsecaseModel = await inversify.createGameUsecase.execute({
      name: dto.name,
      voting: dto.voting
    });
    await this.pubSubHandler.publish('refreshGame', {
      gameId: game.id,
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
    await inversify.joinGameUsecase.execute({   
      game_id: dto.game_id,
      user_code: session.code
    });
    return true;
  }

  @UseGuards(TokenGuard)
  @Query(
    /* istanbul ignore next */
    () => GameResolverModel
  )
  async game(@Args('dto') dto: GetGameResolverDto): Promise<GameResolverModel> {
    return await inversify.gameRepository.get({ id: dto.gameId});
  }

  @UseGuards(TokenGuard)
  @Query(
    /* istanbul ignore next */
    () => [GameResolverModel]
  )
  async games(): Promise<GameResolverModel[]> {
    return inversify.gameRepository.getAll() as GameResolverModel[];
  }

  @SkipThrottle()
  @UseGuards(TokenGuard)
  @Subscription(
    /* istanbul ignore next */
    (): [typeof GameResolverModel] => [GameResolverModel], {
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        return inversify.gameRepository.getAll() as GameResolverModel[];
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
      filter: (payload, variables, context) => {
        return payload.gameId === variables.dto.gameId;
      },
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        const game = inversify.gameRepository.get({ id: args.dto.gameId});
        return game;
      }
    })
  /* istanbul ignore next */
  async subToGame(@Args('dto') dto: GetGameResolverDto) {
    return this.pubSubHandler.asyncIterator('refreshGame');
  }
}