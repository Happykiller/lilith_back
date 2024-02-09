import { Field, ObjectType } from '@nestjs/graphql';
import { VoteResolverModel } from '@presentation/vote/model/vote.resolver.model';

@ObjectType()
export class ItemResolverModel {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  author_id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  state: string;
  @Field(() => [VoteResolverModel], { nullable: true })
  votes: VoteResolverModel[];
}