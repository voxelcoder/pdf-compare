import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PdfFile {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
