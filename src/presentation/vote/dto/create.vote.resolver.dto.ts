import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVoteResolverDto {
  @Field(() => String)
  game_id: string;
  @Field(() => String)
  item_id: string;
  @Field(() => String)
  vote: string;
}