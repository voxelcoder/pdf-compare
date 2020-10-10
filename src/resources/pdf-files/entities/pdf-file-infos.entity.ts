import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PdfFileInfos {
  @Field(() => Int)
  pages: number;

  @Field(() => Int)
  fileSizeInBytes: number;
}
