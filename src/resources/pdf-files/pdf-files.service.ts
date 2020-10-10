import { Injectable } from '@nestjs/common';
import { CreatePdfFileInput } from './dto/create-pdf-file.input';
import { UpdatePdfFileInput } from './dto/update-pdf-file.input';

@Injectable()
export class PdfFilesService {
  create(createPdfFileInput: CreatePdfFileInput) {
    return 'This action adds a new pdfFile';
  }

  findAll() {
    return `This action returns all pdfFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdfFile`;
  }

  update(id: number, updatePdfFileInput: UpdatePdfFileInput) {
    return `This action updates a #${id} pdfFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdfFile`;
  }
}
