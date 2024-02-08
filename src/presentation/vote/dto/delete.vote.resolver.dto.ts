import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteVoteResolverDto {
  @Field(() => String, { nullable: false })
  game_id: string;
  @Field(() => String, { nullable: false })
  item_id: string;
  @Field(() => String, { nullable: false })
  id: string;
}