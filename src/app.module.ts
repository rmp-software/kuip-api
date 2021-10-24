import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { UrlsModule } from './resources/urls/urls.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      path: '/graphql',
      autoSchemaFile: join(join(process.cwd(), 'src/schema.gql')),
    }),
    PostgresDatabaseProviderModule,
    UrlsModule,
  ],
})
export class AppModule {}
