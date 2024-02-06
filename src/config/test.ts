import { Configuration } from "@src/config/configuration";

export const test: Configuration = {
  env: {
    mode: 'test',
    port: 3000
  },
  graphQL: {
    schemaFileName: true,
    playground: true,
    introspection: true,
    installSubscriptionHandlers: true,
  },
  client: {
    token: 'token'
  },
  jwt: {
    refreshTokenName: 'lilith-refresh-token',
    secret: 'secretKey',
    signOptions: {
      expiresIn: '8h'
    }
  }
}