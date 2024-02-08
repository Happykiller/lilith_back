import { Field, ObjectType } from '@nestjs/graphql';
import { ItemResolverModel } from '../../item/model/item.resolver.model';

@ObjectType()
export class GameResolverModel {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => [String], { nullable: true })
  voting: string[];
  @Field(() => [String], { nullable: true })
  members: string[];
  @Field(() => [ItemResolverModel], { nullable: true })
  items: ItemResolverModel[];
}