import { Module } from '@nestjs/common';
import { PdfCompareService } from './pdf-compare/pdf-compare.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleModule } from '../google/google.module';

@Module({
  imports: [PrismaModule, GoogleModule],
  providers: [PdfCompareService],
  exports: [PdfCompareService],
})
export class ComparisonModule {}
