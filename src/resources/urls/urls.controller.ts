import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Url } from './entities/url.entity';
import { UrlsService } from './urls.service';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get(':slug')
  @Redirect()
  async redirect(@Param('slug') slug: string) {
    const url = await this.urlsService.findBySlugAndIncrement(slug);

    if (!url) {
      throw new EntityNotFoundError(Url, '');
    }

    return { url: url?.target || 'https://google.com.br' };
  }
}
