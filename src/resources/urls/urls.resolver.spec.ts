import { Test, TestingModule } from '@nestjs/testing';
import { UrlsResolver } from './urls.resolver';
import { UrlsService } from './urls.service';

describe('UrlsResolver', () => {
  let resolver: UrlsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlsResolver, UrlsService],
    }).compile();

    resolver = module.get<UrlsResolver>(UrlsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
