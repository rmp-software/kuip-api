import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { paginate } from 'src/common/pagination/pagination';
import { PaginationInput } from 'src/common/pagination/dto/pagination.input';
import { Url } from './entities/url.entity';
import { CreateUrlInput } from './dto/create-url.input';
import { UrlsPaginationInput } from 'src/resources/urls/dto/paginated-url.input';

@Injectable()
export class UrlsService {
  constructor(@InjectRepository(Url) private urlRepo: Repository<Url>) {}

  async create(createUrlInput: CreateUrlInput): Promise<Url> {
    const url = this.urlRepo.create(createUrlInput);
    await this.urlRepo.save(url);
    return url;
  }

  findOne(id: string) {
    return this.urlRepo.findOneOrFail(id);
  }

  findAll() {
    return this.urlRepo.find();
  }

  findBySlug(slug: string) {
    return this.urlRepo.findOneOrFail({ where: { slug } });
  }

  async findPaginated(pagination: UrlsPaginationInput = {}) {
    const query = this.urlRepo.createQueryBuilder().select();

    return paginate<Url>(query, pagination, 'slug');
  }

  async findBySlugAndIncrement(slug: string): Promise<Url> {
    const url = await this.urlRepo
      .createQueryBuilder('urls')
      .update(Url)
      .where('urls.slug = :slug', { slug })
      .set({ visits: () => 'visits + 1' })
      .returning('*')
      .execute();

    return url?.raw?.[0];
  }
}
