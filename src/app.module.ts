import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { UrlsModule } from './resources/urls/urls.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(join(process.cwd(), 'src/schema.gql')),
    }),
    PostgresDatabaseProviderModule,
    UrlsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
