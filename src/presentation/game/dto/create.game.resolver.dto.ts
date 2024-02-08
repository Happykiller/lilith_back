import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameResolverDto {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => [String], { nullable: true })
  voting: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '?']
}