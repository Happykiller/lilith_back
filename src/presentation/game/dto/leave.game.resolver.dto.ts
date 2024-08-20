import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LeaveGameResolverDto {
  @Field(() => String, { nullable: false })
  game_id: string;
}