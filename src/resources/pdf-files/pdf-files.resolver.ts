import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PdfFilesService } from './pdf-files.service';
import { PdfFile } from './entities/pdf-file.entity';
import { CreatePdfFileInput } from './dto/create-pdf-file.input';
import { UpdatePdfFileInput } from './dto/update-pdf-file.input';

@Resolver(() => PdfFile)
export class PdfFilesResolver {
  constructor(private readonly pdfFilesService: PdfFilesService) {}

  @Mutation(() => PdfFile)
  createPdfFile(@Args('createPdfFileInput') createPdfFileInput: CreatePdfFileInput) {
    return this.pdfFilesService.create(createPdfFileInput);
  }

  @Query(() => [PdfFile], { name: 'pdfFiles' })
  findAll() {
    return this.pdfFilesService.findAll();
  }

  @Query(() => PdfFile, { name: 'pdfFile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pdfFilesService.findOne(id);
  }

  @Mutation(() => PdfFile)
  updatePdfFile(@Args('updatePdfFileInput') updatePdfFileInput: UpdatePdfFileInput) {
    return this.pdfFilesService.update(updatePdfFileInput.id, updatePdfFileInput);
  }

  @Mutation(() => PdfFile)
  removePdfFile(@Args('id', { type: () => Int }) id: number) {
    return this.pdfFilesService.remove(id);
  }
}
