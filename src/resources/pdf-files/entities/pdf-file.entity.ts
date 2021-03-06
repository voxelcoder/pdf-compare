import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { PdfFileInfos } from './pdf-file-infos.entity';
import { AuthenticatedUserType } from '../../../prisma/services/user/types/authenticated-user.type';

@ObjectType()
export class PdfFile {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  owner: AuthenticatedUserType;

  @Field()
  ownerId: string;

  @Field()
  fileInfos: PdfFileInfos;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletesAt?: Date;
}
