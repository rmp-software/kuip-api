import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';

import { SqliteDatabaseProviderModule } from '../../providers/database/sqlite/provider.module';
import { UrlsModule } from './urls.module';
import { UrlsResolver } from './urls.resolver';

describe('UrlsResolver', () => {
  let resolver: UrlsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SqliteDatabaseProviderModule, UrlsModule],
    }).compile();

    resolver = module.get<UrlsResolver>(UrlsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => {
    await getConnection().close();
  });
});
