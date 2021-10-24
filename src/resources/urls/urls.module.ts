import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsResolver } from './urls.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { UrlsController } from './urls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlsResolver, UrlsService],
  controllers: [UrlsController],
})
export class UrlsModule {}
