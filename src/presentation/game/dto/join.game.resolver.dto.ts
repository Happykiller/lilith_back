import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JoinGameResolverDto {
  @Field(() => String, { nullable: false })
  game_id: string;
}