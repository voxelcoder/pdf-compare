import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PdfCompareService } from '../../comparison/pdf-compare/pdf-compare.service';
import { PdfFilesService } from './pdf-files.service';
import { PdfUploadInterceptor } from './interceptors/pdf-upload.interceptor';

@Controller('pdf-files')
export class PdfFilesController {
  constructor(
    private readonly pdfCompareService: PdfCompareService,
    private readonly pdfFilesService: PdfFilesService,
  ) {}

  @Post('compare')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'pdfFirst', maxCount: 1 },
        { name: 'pdfSecond', maxCount: 1 },
      ],
      {
        // @TODO Find out how to upload files to Google Cloud Storage with multer (or another lib)
        // @TODO Maybe temporarily upload with multer here, and upload to GCS afterwards
        // @TODO Add a rate-limiter
        storage: memoryStorage(),
        limits: {
          fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
        },
      },
    ),
    PdfUploadInterceptor,
  )
  async compareFiles(
    @UploadedFiles()
    files: {
      pdfFirst: Express.Multer.File[];
      pdfSecond: Express.Multer.File[];
    },
  ) {
    const pdfFirst = files.pdfFirst[0] || null;
    const pdfSecond = files.pdfSecond[0] || null;

    if (pdfFirst === null || pdfSecond === null) {
      throw new BadRequestException(
        null,
        'Please specify at least one file for `pdfFirst` and one for `pdfSecond`',
      );
    }

    return this.pdfFilesService.compareFiles({ pdfFirst, pdfSecond });
  }
}
