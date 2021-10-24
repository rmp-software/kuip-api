import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import {
  getConnection,
  Repository,
  QueryFailedError,
  EntityNotFoundError,
} from 'typeorm';

import { CreateUrlInput } from 'src/resources/urls/dto/create-url.input';
import { SqliteDatabaseProviderModule } from '../../providers/database/sqlite/provider.module';
import { UrlsModule } from './urls.module';
import { UrlsService } from './urls.service';
import { Url } from './entities/url.entity';

const factories = {
  createUrlInput: (
    overrides: Partial<CreateUrlInput> = {},
  ): CreateUrlInput => ({
    slug: faker.lorem.slug(),
    target: faker.internet.url(),
    ...overrides,
  }),
  createUrlInputWithoutSlug: (
    overrides: Partial<CreateUrlInput> = {},
  ): CreateUrlInput => ({
    target: faker.internet.url(),
    ...overrides,
  }),
};

describe('UrlsService', () => {
  let urlsService: UrlsService;
  let urlsRepo: Repository<Url>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SqliteDatabaseProviderModule, UrlsModule],
    }).compile();

    urlsService = module.get<UrlsService>(UrlsService);
    urlsRepo = getConnection().getRepository(Url);
  });

  it('should be defined', () => {
    expect(urlsService).toBeDefined();
  });

  describe('create', () => {
    it('should create url with unique slug and valid url', async () => {
      const saveSpy = jest.spyOn(urlsRepo, 'save');
      const createSpy = jest.spyOn(urlsRepo, 'create');
      const payload = factories.createUrlInput();

      const result = await urlsService.create(payload);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
      expect(result.slug).toBe(payload.slug);
    });

    it('should create url without slug', async () => {
      const saveSpy = jest.spyOn(urlsRepo, 'save');
      const createSpy = jest.spyOn(urlsRepo, 'create');
      const payload = factories.createUrlInputWithoutSlug();

      const result = await urlsService.create(payload);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
      expect(result.slug).toBeDefined();
    });

    it('should throw when calling with duplicated slug', async () => {
      const saveSpy = jest.spyOn(urlsRepo, 'save');
      const payload = factories.createUrlInput();

      await urlsService.create(payload);

      let error: QueryFailedError;
      try {
        await urlsService.create(payload);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(saveSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('findBySlug', () => {
    it('should return a url given a existing slug', async () => {
      const payload = factories.createUrlInputWithoutSlug();

      const createResult = await urlsService.create(payload);
      expect(createResult).toBeDefined();

      const findResult = await urlsService.findBySlug(createResult.slug);
      expect(findResult).toBeDefined();

      expect(findResult).toEqual(createResult);
    });

    it('should throw when called with an inexistent slug', async () => {
      const payload = factories.createUrlInput({
        slug: 'hello-world',
      });

      const createResult = await urlsService.create(payload);
      expect(createResult).toBeDefined();

      let findResult: Url;
      let error: EntityNotFoundError;
      try {
        findResult = await urlsService.findBySlug('not-hello-world');
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(findResult).not.toBeDefined();
    });
  });

  afterEach(async () => {
    await getConnection().close();
  });
});
