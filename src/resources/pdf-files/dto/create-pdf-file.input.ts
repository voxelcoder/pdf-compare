import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { AuthenticatedUserType } from '../../../prisma/services/user/types/authenticated-user.type';
import { PdfFileInfos } from '../entities/pdf-file-infos.entity';

@InputType()
export class CreatePdfFileInput {
  @Field()
  url: string;

  @Field()
  owner: AuthenticatedUserType;

  @Field()
  ownerId: string;

  @Field()
  pdfFileInfos: PdfFileInfos;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  deletesAt: Date;

  @Field({ defaultValue: false })
  deleted: boolean;
}
