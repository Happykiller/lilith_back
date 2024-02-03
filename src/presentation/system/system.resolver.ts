import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { version } from '../../../package.json'

@ObjectType()
export class SessionModelResolver {
  @Field(() => String)
  version: string;
}

@Resolver('SystemResolver')
export class SystemResolver {

  @Query(
    /* istanbul ignore next */
    () => SessionModelResolver
  )
  async systemInfo(): Promise<SessionModelResolver> {
    return {
      version
    };
  }
}