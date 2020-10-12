import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PdfFilesService } from './pdf-files.service';
import { PdfFile } from './entities/pdf-file.entity';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../../common/guards/graphql-auth.guard';
import { GraphQLUser } from '../../common/decorators/graphql-user.decorator';
import { AuthenticatedUserType } from '../../prisma/services/user/types/authenticated-user.type';

@Resolver(() => PdfFile)
export class PdfFilesResolver {
  constructor(private readonly pdfFilesService: PdfFilesService) {}

  @UseGuards(GraphQLAuthGuard)
  @Query(() => [PdfFile], { name: 'pdfFiles' })
  findAll(@GraphQLUser() user: AuthenticatedUserType) {
    return this.pdfFilesService.findAll(user);
  }

  @Query(() => PdfFile, { name: 'pdfFile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pdfFilesService.findOne(id);
  }

  @Mutation(() => PdfFile)
  removePdfFile(@Args('id', { type: () => Int }) id: number) {
    return this.pdfFilesService.remove(id);
  }
}
