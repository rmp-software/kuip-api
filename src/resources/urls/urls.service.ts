import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';
import { CreateUrlInput } from './dto/create-url.input';

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
