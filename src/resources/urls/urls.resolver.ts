import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UrlsService } from './urls.service';
import { Url } from './entities/url.entity';
import { CreateUrlInput } from './dto/create-url.input';

@Resolver(() => Url)
export class UrlsResolver {
  constructor(private readonly urlsService: UrlsService) {}

  @Mutation(() => Url)
  store(@Args('createUrlInput') createUrlInput: CreateUrlInput) {
    return this.urlsService.create(createUrlInput);
  }

  @Query(() => [Url], { name: 'urls' })
  index() {
    return this.urlsService.findAll();
  }

  @Query(() => Url, { name: 'url' })
  show(@Args('id', { type: () => Int }) id: number) {
    return this.urlsService.findOne(id);
  }

  @Mutation(() => Url)
  destroy(@Args('id', { type: () => Int }) id: number) {
    return this.urlsService.remove(id);
  }
}
