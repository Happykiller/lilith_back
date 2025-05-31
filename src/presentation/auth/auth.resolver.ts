//src\presentation\auth\auth.resolver.ts
import {
  Args,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver
} from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { CurrentSession, makeAuthGuard, USER_ROLE, UserSession, UserSessionResolverModel, UserSessionUsecaseModel } from '@happykiller/sunny-apis';

@ObjectType()
export class AuthModelResolver {
  @Field(() => String, { description: 'Session token' })
  access_token: string;
  @Field(() => String, { description: 'Id of the user' })
  id: string;
  @Field(() => String, { description: 'Code of the user' })
  code: string;
}

@InputType()
export class AuthInput {
  @Field({ description: 'User code for the session' })
  login: string;
  @Field({ description: 'Secret for the session' })
  secret: string;
}

@Resolver('AuthResolver')
export class AuthResolver {

  constructor(
    private jwtService: JwtService
  ) {}

  @Query(
    /* istanbul ignore next */
    (): typeof AuthModelResolver => AuthModelResolver
  )
  async auth(@Args('dto') dto: AuthInput): Promise<AuthModelResolver> {
    const userSession:UserSessionUsecaseModel = await inversify.authUsecase.execute({
      login: dto.login,
      password: dto.secret
    });

    if (!userSession) {
      throw new UnauthorizedException('error.credentials_wrong');
    }

    const token = this.jwtService.sign({ 
      code: userSession.code,
      id: userSession.id
    });
    return {
      access_token: token,
      ... userSession
    };
  }

  @UseGuards(makeAuthGuard('graphql', [USER_ROLE.ALL]))
  @Query(
    /* istanbul ignore next */
    (): typeof AuthModelResolver => AuthModelResolver,
  )
  async getSessionInfo(
    @CurrentSession() session: UserSession,
  ): Promise<AuthModelResolver> {

    const userSession: UserSessionResolverModel =
      await inversify.getUserUsecase.execute({
        id: session.id,
      });

    if (!userSession) {
      throw new UnauthorizedException('Credentials wrong');
    }

    const token = this.jwtService.sign({
      code: userSession.code,
      id: userSession.id,
      role: userSession.role,
    });

    return {
      access_token: token,
      ...userSession,
    };
  }
}