import { Module } from '@nestjs/common';
import { PdfCompareService } from './pdf-compare/pdf-compare.service';

@Module({
  providers: [PdfCompareService],
  exports: [PdfCompareService],
})
export class ComparisonModule {}
