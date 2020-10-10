import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PdfFilesService } from './pdf-files.service';
import { PdfFile } from './entities/pdf-file.entity';

@Resolver(() => PdfFile)
export class PdfFilesResolver {
  constructor(private readonly pdfFilesService: PdfFilesService) {}

  @Query(() => [PdfFile], { name: 'pdfFiles' })
  findAll() {
    return this.pdfFilesService.findAll();
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
