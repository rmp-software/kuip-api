import { Type } from '@nestjs/common';
import { Int, Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, Min, IsBase64, IsOptional } from 'class-validator';
import { CursorExists } from 'src/validators/cursor-exists.rule';
import { BaseEntity } from 'typeorm';

export function PaginationInput<T>(
  classRef: Type<T>,
  cursorColumn?: string,
): any {
  @InputType()
  abstract class PaginatedInputType {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(1)
    first?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @IsBase64()
    @CursorExists(classRef, cursorColumn)
    after?: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(1)
    last?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @IsBase64()
    @CursorExists(classRef, cursorColumn)
    before?: string;
  }
  return PaginatedInputType;
}

export const BasePaginationInput = PaginationInput(BaseEntity, 'id');
