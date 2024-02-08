import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VoteResolverModel {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  user_code: string;
  @Field(() => String, { nullable: true })
  vote: string;
}