import { Module } from '@nestjs/common';
import { PdfFilesService } from './pdf-files.service';
import { PdfFilesResolver } from './pdf-files.resolver';
import { PdfFilesController } from './pdf-files.controller';
import { ComparisonModule } from '../../comparison/comparison.module';
import { GoogleModule } from '../../google/google.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [ComparisonModule, GoogleModule, PrismaModule, ConfigModule],
  providers: [PdfFilesResolver, PdfFilesService],
  controllers: [PdfFilesController],
})
export class PdfFilesModule {}
