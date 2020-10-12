import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GoogleStorageService } from '../../google/google-storage/google-storage.service';

@Injectable()
export class PdfCompareService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly googleStorageService: GoogleStorageService,
  ) {}

  async downloadFromGoogleCloudStorage(fileName: string): Promise<Buffer> {
    return (
      this.googleStorageService
        .getPdfCompareBucket()
        .file(fileName)
        // Passing in no options downloads the files into memory.
        .download({})
        // Map the first and only child of data to a buffer.
        .then(data => data[0])
    );
  }

  async compare(
    firstPdfFileId: string,
    secondPdfFileId: string,
  ): Promise<void> {
    const pdfFiles = await this.prismaService.pdfFile.findMany({
      where: { id: { in: [firstPdfFileId, secondPdfFileId] } },
    });

    pdfFiles.forEach(async pdfFile => {
      const bla = await this.downloadFromGoogleCloudStorage(pdfFile.remotePath);
      bla;
    });

    // @TODO Implement
  }
}
