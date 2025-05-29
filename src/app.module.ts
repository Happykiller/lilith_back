// src\app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { config } from '@src/config';
import { version } from '../package.json';
import inversify from '@src/inversify/investify';
import { AuthModule } from '@presentation/auth/auth.module';
import { GameModule } from '@presentation/game/game.module';
import { ItemModule } from '@presentation/item/item.module';
import { VoteModule } from '@presentation/vote/vote.module';
import { AuthGuardModule, SystemModule } from '@happykiller/sunny-apis';

@Module({
  imports: [
    // Sunny,
    AuthGuardModule.forRoot({
      appConfig: config,
      inversify,
    }),
    SystemModule.forRoot({
      version,
      inversify,
    }),
    // Project
    AuthModule,
    GameModule,
    ItemModule,
    VoteModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (context) => {
            const { connectionParams } = context;
            return {
              req: {
                headers: {
                  authorization: connectionParams.Authorization,
                },
              },
            };
          },
        },
      },
      playground: false,
      introspection: true,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot(config.throttle),
  ]
})
export class AppModule { }
