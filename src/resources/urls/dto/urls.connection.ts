import { ObjectType } from '@nestjs/graphql';

import { Url } from '../entities/url.entity';
import { Paginated } from 'src/common/pagination/types/paginated';

@ObjectType()
export class UrlsConnection extends Paginated(Url) {}
