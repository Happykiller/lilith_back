// src\presentation\game\game.resolver.ts
import { SkipThrottle } from '@nestjs/throttler';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Parent, ResolveField, Resolver, Subscription } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { PubSubHandler } from '@presentation/pubSub/pubSubHandler';
import { GameUsecaseModel } from '@usecase/game/model/game.usecase.model';
import { GameResolverModel } from '@presentation/game/model/game.resolver.model';
import { GetGameResolverDto } from '@presentation/game/dto/get.game.resolver.dto';
import { JoinGameResolverDto } from '@presentation/game/dto/join.game.resolver.dto';
import { LeaveGameResolverDto } from '@presentation/game/dto/leave.game.resolver.dto';
import { CreateGameResolverDto } from '@presentation/game/dto/create.game.resolver.dto';
import { CurrentSession, makeAuthGuard, USER_ROLE, UserResolverModel, UserSession, UserUsecaseModel } from '@happykiller/sunny-apis';

@Resolver(of => GameResolverModel)
export class GameResolver {

  constructor(
    @Inject('PubSubHandler')
    private pubSubHandler: PubSubHandler
  ) {}

  @ResolveField(() => [UserResolverModel])
  async members_obj(@Parent() game:GameResolverModel):Promise<UserResolverModel[]> {
    const response:UserResolverModel[] = [];

    for(const member_id of game.members){
      const user:UserUsecaseModel = await inversify.getUserUsecase.execute({
        id: member_id
      })
      response.push(user);
    }
    
    return response;
  }

  @ResolveField(() => UserResolverModel)
  async author(@Parent() game:GameResolverModel):Promise<UserResolverModel> {
    const user:UserUsecaseModel = await inversify.getUserUsecase.execute({
      id: game.author_id
    })
    return user;
  }

  @UseGuards(makeAuthGuard('graphql', [USER_ROLE.ALL]))
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

  @UseGuards(makeAuthGuard('graphql', [USER_ROLE.ALL]))
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

  @UseGuards(makeAuthGuard('graphql', [USER_ROLE.ALL]))
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async leave_game(@CurrentSession() session: UserSession, @Args('dto') dto: LeaveGameResolverDto): Promise<boolean> {
    const game:GameResolverModel = await inversify.leaveGameUsecase.execute({   
      game_id: dto.game_id,
      user_id: session.id
    });
    await this.pubSubHandler.publish('refreshGame', {
      game_id: dto.game_id,
      action: 'leave_game' 
    });
    return true;
  }

  @UseGuards(makeAuthGuard('graphql', [USER_ROLE.ALL]))
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

  @UseGuards(makeAuthGuard('graphql', [USER_ROLE.ALL]))
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
  @UseGuards(makeAuthGuard('ws', [USER_ROLE.ALL]))
  @Subscription(
    /* istanbul ignore next */
    (): [typeof GameResolverModel] => [GameResolverModel], {
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        const userSession: UserSession = context.session;
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
  @UseGuards(makeAuthGuard('ws', [USER_ROLE.ALL]))
  @Subscription(
    /* istanbul ignore next */
    (): typeof GameResolverModel => GameResolverModel, 
    {
      filter: (payload, variables) => {
        return payload.game_id === variables.dto.game_id;
      },
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        const userSession: UserSession = context.session;
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