import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UrlsService } from './urls.service';
import { Url } from './entities/url.entity';
import { CreateUrlInput } from './dto/create-url.input';

@Resolver(() => Url)
export class UrlsResolver {
  constructor(private readonly urlsService: UrlsService) {}

  @Mutation(() => Url)
  createUrl(@Args('input') input: CreateUrlInput) {
    return this.urlsService.create(input);
  }

  @Query(() => Url, { name: 'url' })
  url(@Args('id', { type: () => String }) id: string) {
    return this.urlsService.findOne(id);
  }
}
