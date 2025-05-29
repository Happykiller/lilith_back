// src\presentation\auth\auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { config } from '@src/config';
import inversify from '@src/inversify/investify';
import { JwtStrategy } from '@happykiller/sunny-apis';
import { AuthResolver } from '@presentation/auth/auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(config.jwt)
  ],
  providers: [
    AuthResolver,
    JwtStrategy,
    {
      provide: 'Inversify',
      useValue: inversify,
    },
    {
      provide: 'AppConfig',
      useValue: config,
    },
  ]
})
export class AuthModule { }
