import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { config } from '@src/config';
import { AuthModule } from '@presentation/auth/auth.module';
import { SystemModule } from '@presentation/system/system.module';
import { SessionModule } from '@presentation/session/session.module';

@Module({
  imports: [
    AuthModule,
    SystemModule,
    SessionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (context: any) => {
            const { connectionParams, subscriptions } = context;
            return { req: { Authorization: connectionParams.Authorization } };
          }
        },
      },
      playground: config.graphQL.playground,
      introspection: config.graphQL.introspection,
      autoSchemaFile: config.graphQL.schemaFileName,
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot(config.ratelimit),
  ]
})
export class AppModule {}
