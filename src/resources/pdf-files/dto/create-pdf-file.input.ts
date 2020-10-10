import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePdfFileInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}