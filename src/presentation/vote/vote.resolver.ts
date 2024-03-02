import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { TokenGuard } from '@presentation/guard/token.guard';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { PubSubHandler } from '@src/presentation/pubSub/pubSubHandler';
import { VoteUsecaseModel } from '@usecase/vote/model/vote.usecase.model';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';
import { CurrentSession } from '@presentation/guard/userSession.decorator';
import { UserResolverModel } from '@presentation/user/model/user.resolver.model';
import { VoteResolverModel } from '@presentation/vote/model/vote.resolver.model';
import { CreateVoteResolverDto } from '@presentation/vote/dto/create.vote.resolver.dto';
import { DeleteVoteResolverDto } from '@presentation/vote/dto/delete.vote.resolver.dto';

@Resolver(of => VoteResolverModel)
export class VoteResolver {

  constructor(
    @Inject('PubSubHandler')
    private pubSubHandler: PubSubHandler
  ) {}

  @ResolveField(() => UserResolverModel)
  async author(@Parent() vote:VoteResolverModel):Promise<UserResolverModel> {
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
    () => VoteResolverModel
  )
  async createVote(@CurrentSession() session: UserSession, @Args('dto') dto: CreateVoteResolverDto): Promise<VoteResolverModel> {
    const vote:VoteUsecaseModel = await inversify.createVoteUsecase.execute({
      user_id: session.id,
      ... dto
    });
    await this.pubSubHandler.publish('refreshGame', { 
      game_id: dto.game_id,
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
      game_id: dto.game_id,
      action: 'deleteVote' 
    });
    return true;
  }
}