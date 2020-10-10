import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfFilesService {
  findAll() {
    return `This action returns all pdfFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdfFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdfFile`;
  }
}
