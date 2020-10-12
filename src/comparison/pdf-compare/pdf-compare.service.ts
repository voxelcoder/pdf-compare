import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfCompareService {
  async compare(
    firstPdfFileId: string,
    secondPdfFileId: string,
  ): Promise<Record<string, unknown>> {
    // @TODO Implement
    return {};
  }
}
