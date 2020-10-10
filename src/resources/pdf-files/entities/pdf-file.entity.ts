import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { PdfFileInfos } from './pdf-file-infos.entity';

@ObjectType()
export class PdfFile {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  fileInfos: PdfFileInfos;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletesAt?: Date;
}
