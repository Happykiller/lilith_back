import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResolverModel {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  code: string;
}