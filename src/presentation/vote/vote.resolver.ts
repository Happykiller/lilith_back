import { SkipThrottle } from '@nestjs/throttler';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType, Query, Resolver, Subscription } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { PubSubHandler } from '@src/pubSub/pubSubHandler';
import { TokenGuard } from '@src/presentation/guard/token.guard';
import { CreateVoteResolverDto } from './dto/create.vote.resolver.dto';
import { CurrentSession } from '../guard/userSession.decorator';
import { UserSession } from '../auth/jwt.strategy';
import { VoteUsecaseModel } from '../../usecase/vote/model/vote.usecase.model';
import { VoteResolverModel } from './model/vote.resolver.model';
import { DeleteVoteResolverDto } from './dto/delete.vote.resolver.dto';

@Resolver('VoteResolver')
export class VoteResolver {

  constructor(
    @Inject('PubSubHandler')
    private pubSubHandler: PubSubHandler
  ) {}

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => VoteResolverModel
  )
  async createVote(@CurrentSession() session: UserSession, @Args('dto') dto: CreateVoteResolverDto): Promise<VoteResolverModel> {
    const vote:VoteUsecaseModel = await inversify.createVoteUsecase.execute({
      user_code: session.code,
      ... dto
    })
    await this.pubSubHandler.publish('refreshGame', { 
      gameId: dto.game_id,
      action: 'createVote' 
    });
    return vote;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async deleteVote(@Args('dto') dto: DeleteVoteResolverDto): Promise<boolean> {
    await inversify.deleteVoteUsecase.execute(dto);
    await this.pubSubHandler.publish('refreshGame', { 
      gameId: dto.game_id,
      action: 'deleteVote' 
    });
    return true;
  }
}