import { Module } from '@nestjs/common';
import { PdfFilesService } from './pdf-files.service';
import { PdfFilesResolver } from './pdf-files.resolver';
import { PdfFilesController } from './pdf-files.controller';
import { ComparisonModule } from '../../comparison/comparison.module';
import { GoogleModule } from '../../google/google.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ComparePdfFilesHandler } from './commands/handlers/compare-pdf-files.handler';

@Module({
  imports: [
    ComparisonModule,
    GoogleModule,
    PrismaModule,
    ConfigModule,
    CqrsModule,
  ],
  providers: [PdfFilesResolver, PdfFilesService, ComparePdfFilesHandler],
  controllers: [PdfFilesController],
})
export class PdfFilesModule {}
