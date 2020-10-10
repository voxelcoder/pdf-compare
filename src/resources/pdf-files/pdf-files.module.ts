import { Module } from '@nestjs/common';
import { PdfFilesService } from './pdf-files.service';
import { PdfFilesResolver } from './pdf-files.resolver';

@Module({
  providers: [PdfFilesResolver, PdfFilesService]
})
export class PdfFilesModule {}
