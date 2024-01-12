import mongoose from 'mongoose';
import { SkipThrottle } from '@nestjs/throttler';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType, Query, Resolver, Subscription } from '@nestjs/graphql';

import inversify from '@src/inversify/investify';
import { PubSubHandler } from '@src/pubSub/pubSubHandler';
import { TokenGuard } from '@src/presentation/guard/token.guard';
import { SessionRecordRepository } from '@src/repository/session.repositoy';

@InputType()
export class CreateSessionInputResolver {
  @Field(() => String, { nullable: false })
  name: string;
}

@ObjectType()
export class SessionVoteRecordObjectResolver {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  member: string;
  @Field(() => String, { nullable: true })
  vote: string;
}

@ObjectType()
export class SessionItemRecordObjectResolver {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  author: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  state: string;
  @Field(() => [SessionVoteRecordObjectResolver], { nullable: true })
  votes: SessionVoteRecordObjectResolver[];
}

@ObjectType()
export class SessionDetailsRecordObjectResolver {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => [String], { nullable: true })
  voting: string[];
  @Field(() => [String], { nullable: true })
  members: string[];
  @Field(() => [SessionItemRecordObjectResolver], { nullable: true })
  items: SessionItemRecordObjectResolver[];
}

@InputType()
export class JoinSessionInputResolver {
  @Field(() => String, { nullable: false })
  sessionId: string;
  @Field(() => String, { nullable: false })
  username: string;
}

@InputType()
export class SessionInputResolver {
  @Field(() => String, { nullable: false })
  sessionId: string;
}

@InputType()
export class SubSessionInputResolver {
  @Field(() => String, { nullable: false })
  sessionId: string;
}

@InputType()
export class CreateItemInputResolver {
  @Field(() => String, { nullable: false })
  sessionId: string;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  author: string;
}

@InputType()
export class CreateVoteInputResolver {
  @Field(() => String, { nullable: false })
  sessionId: string;
  @Field(() => String, { nullable: false })
  itemId: string;
  @Field(() => String, { nullable: false })
  member: string;
  @Field(() => String, { nullable: false })
  vote: string;
}
@InputType()
export class removeVoteInputResolver {
  @Field(() => String, { nullable: false })
  sessionId: string;
  @Field(() => String, { nullable: false })
  itemId: string;
  @Field(() => String, { nullable: false })
  voteId: string;
}

@InputType()
export class RevealInputResolver {
  @Field(() => String, { nullable: false })
  sessionId: string;
  @Field(() => String, { nullable: false })
  itemId: string;
}

@Resolver('SessionResolver')
export class SessionResolver {

  constructor(
    @Inject('PubSubHandler')
    private pubSubHandler: PubSubHandler
  ) {}

  @Mutation(
    /* istanbul ignore next */
    (): typeof SessionDetailsRecordObjectResolver => SessionDetailsRecordObjectResolver
  )
  async createSession(@Args('dto') dto: CreateSessionInputResolver): Promise<SessionDetailsRecordObjectResolver> {
    const session:SessionRecordRepository = inversify.sessionRepository.create({
      name: dto.name,
      voting: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?']
    });
    await this.pubSubHandler.publish('refreshSession', {
      sessionId: session.id,
      action: 'createSession' 
    });
    return session as SessionDetailsRecordObjectResolver;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async joinSession(@Args('dto') dto: JoinSessionInputResolver): Promise<boolean> {
    const session = inversify.sessionRepository.get({ id: dto.sessionId});
    if (!session.members.includes(dto.username)) {
      session.members.push(dto.username);
      await this.pubSubHandler.publish('refreshSession', { 
        sessionId: dto.sessionId,
        action: 'joinSession' 
      });
    }
    return true;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => SessionItemRecordObjectResolver
  )
  async createItem(@Args('dto') dto: CreateItemInputResolver): Promise<SessionItemRecordObjectResolver> {
    const session = inversify.sessionRepository.get({ id: dto.sessionId});
    const item = {
      id: new mongoose.Types.ObjectId().toString(),
      name: dto.name,
      author: dto.author,
      state: 'CREATE',
      votes: []
    };
    session.items.push(item);
    await this.pubSubHandler.publish('refreshSession', { 
      sessionId: dto.sessionId,
      action: 'createItem' 
    });
    return item;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => SessionVoteRecordObjectResolver
  )
  async createVote(@Args('dto') dto: CreateVoteInputResolver): Promise<SessionVoteRecordObjectResolver> {
    const session = inversify.sessionRepository.get({ id: dto.sessionId});
    const item = session.items.find(item => item.id === dto.itemId);
    const voteIndex = item.votes.findIndex(vote => vote.member === dto.member);
    if(voteIndex !== -1) {
      throw new Error('ALREADY_VOTED');
    }
    const vote = {
      id: new mongoose.Types.ObjectId().toString(),
      member: dto.member,
      vote: dto.vote 
    };
    item.votes.push(vote);
    await this.pubSubHandler.publish('refreshSession', { 
      sessionId: dto.sessionId,
      action: 'createVote' 
    });
    return vote;
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async removeVote(@Args('dto') dto: removeVoteInputResolver): Promise<boolean> {
    const session = inversify.sessionRepository.get({ id: dto.sessionId});
    const item = session.items.find(item => dto.itemId === item.id);
    const voteIndex = item.votes.findIndex(vote => dto.voteId === vote.id);
    item.votes.splice(voteIndex, 1);
    await this.pubSubHandler.publish('refreshSession', { 
      sessionId: dto.sessionId,
      action: 'removeVote' 
    });
    return true;
  }

  @UseGuards(TokenGuard)
  @Query(
    /* istanbul ignore next */
    () => SessionDetailsRecordObjectResolver
  )
  async session(@Args('dto') dto: SessionInputResolver): Promise<SessionDetailsRecordObjectResolver> {
    return inversify.sessionRepository.get({ id: dto.sessionId});
  }

  @UseGuards(TokenGuard)
  @Mutation(
    /* istanbul ignore next */
    () => Boolean
  )
  async reveal(@Args('dto') dto: RevealInputResolver): Promise<boolean> {
    const session = inversify.sessionRepository.get({ id: dto.sessionId});
    const item = session.items.find(item => item.id === dto.itemId);
    item.state = 'REVEAL';
    await this.pubSubHandler.publish('refreshSession', { 
      sessionId: dto.sessionId,
      action: 'reveal' 
    });
    return true;
  }

  @UseGuards(TokenGuard)
  @Query(
    /* istanbul ignore next */
    () => [SessionDetailsRecordObjectResolver]
  )
  async sessions(): Promise<SessionDetailsRecordObjectResolver[]> {
    return inversify.sessionRepository.getAll() as SessionDetailsRecordObjectResolver[];
  }

  @SkipThrottle()
  @UseGuards(TokenGuard)
  @Subscription(
    /* istanbul ignore next */
    (): [typeof SessionDetailsRecordObjectResolver] => [SessionDetailsRecordObjectResolver], {
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        return inversify.sessionRepository.getAll() as SessionDetailsRecordObjectResolver[];
      }
    })
  /* istanbul ignore next */
  async subToSessions() {
    return this.pubSubHandler.asyncIterator('refreshSession');
  }

  @SkipThrottle()
  @UseGuards(TokenGuard)
  @Subscription(
    /* istanbul ignore next */
    (): typeof SessionDetailsRecordObjectResolver => SessionDetailsRecordObjectResolver, 
    {
      filter: (payload, variables, context) => {
        return payload.sessionId === variables.dto.sessionId;
      },
      /* istanbul ignore next */
      async resolve(payload: any, args: any, context: any, info: any) {
        const session = inversify.sessionRepository.get({ id: args.dto.sessionId});
        return session;
      }
    })
  /* istanbul ignore next */
  async subToSession(@Args('dto') dto: SubSessionInputResolver) {
    return this.pubSubHandler.asyncIterator('refreshSession');
  }
}