import { Injectable } from '@nestjs/common';
import { CreateUrlInput } from './dto/create-url.input';

@Injectable()
export class UrlsService {
  create(createUrlInput: CreateUrlInput) {
    return 'This action adds a new url';
  }

  findAll() {
    return `This action returns all urls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
