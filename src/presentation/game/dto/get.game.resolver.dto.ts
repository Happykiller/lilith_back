import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetGameResolverDto {
  @Field(() => String, { nullable: false })
  game_id: string;
}