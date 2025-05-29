// src\config\defaults.ts
import { loadEnv } from './loadEnv';
import { version } from '../../package.json';
import { Configuration } from './configuration';

const env = loadEnv();

const defaults: Configuration = {
  app_name: 'lilith',
  version,
  env: {
    mode: 'defaults',
    port: parseInt(env.APP_PORT) ?? 3000
  },
  graphQL: {
    schemaFileName: true,
    playground: true,
    introspection: true,
    installSubscriptionHandlers: true,
  },
  jwt: {
    refreshTokenName: 'lilith-refresh-token',
    secret: env.TOKEN_CLIENT ?? 'secretKey',
    signOptions: {
      expiresIn: '8h'
    }
  },
  db: {
    connection_string: env.DB_CONN_STRING ?? '',
    name: env.DB_NAME ?? 'lilith',
  },
  throttle: [
    {
      ttl: 60000,
      limit: 10,
    },
  ],
};

export { defaults };
