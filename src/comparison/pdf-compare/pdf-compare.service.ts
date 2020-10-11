import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfCompareService {
  async compare(
    firstPdfFile: Express.Multer.File,
    secondPdfFile: Express.Multer.File,
  ): Promise<Record<string, unknown>> {
    // @TODO Implement
    return {};
  }
}
