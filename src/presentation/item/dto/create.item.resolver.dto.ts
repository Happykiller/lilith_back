import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemResolverDto {
  @Field(() => String, { nullable: false })
  game_id: string;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  user_code: string;
}