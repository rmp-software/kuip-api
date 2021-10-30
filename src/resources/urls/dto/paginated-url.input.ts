import { InputType } from '@nestjs/graphql';

import { Url } from '../entities/url.entity';
import { PaginationInput } from 'src/common/pagination/dto/pagination.input';

@InputType()
export class UrlsPaginationInput extends PaginationInput(Url, 'slug') {}
