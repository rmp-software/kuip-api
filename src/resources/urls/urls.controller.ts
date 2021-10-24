import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { UrlsService } from './urls.service';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get(':slug')
  @Redirect()
  async redirect(@Param('slug') slug: string) {
    const url = await this.urlsService.findBySlugAndIncrement(slug);
    return { url: url.target || 'https://google.com.br' };
  }
}
