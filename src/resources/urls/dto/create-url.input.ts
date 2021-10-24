import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

import { NotExists } from '../../../validators/not-exists.rule';
import { Url } from '../entities/url.entity';

@InputType()
export class CreateUrlInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  target: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @NotExists(Url, 'slug')
  slug?: string;
}
