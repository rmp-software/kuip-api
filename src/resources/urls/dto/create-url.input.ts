import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUrlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
