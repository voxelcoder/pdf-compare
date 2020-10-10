import { Module } from '@nestjs/common';
import { PdfFilesService } from './pdf-files.service';
import { PdfFilesResolver } from './pdf-files.resolver';
import { PdfFilesController } from './pdf-files.controller';

@Module({
  providers: [PdfFilesResolver, PdfFilesService],
  controllers: [PdfFilesController]
})
export class PdfFilesModule {}
