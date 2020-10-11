import { Injectable } from '@nestjs/common';
import { PdfCompareService } from '../../comparison/pdf-compare/pdf-compare.service';
import { GoogleStorageService } from '../../google/google-storage/google-storage.service';

@Injectable()
export class PdfFilesService {
  constructor(
    private readonly googleStorageService: GoogleStorageService,
    private readonly pdfCompareService: PdfCompareService,
  ) {}

  async compareFiles(files: {
    pdfFirst: Express.Multer.File;
    pdfSecond: Express.Multer.File;
  }) {
    const bucket = this.googleStorageService.getPdfCompareBucket();

    const blob = bucket.file(files.pdfFirst.originalname);
    const blobStream = blob.createWriteStream();

    return '';

    // @TODO remove pdf files from memory if that's not done already

    // @TODO get both pfd files from bucket and compare (call the function in a queue)
    const newPdf = await this.pdfCompareService.compare(
      files.pdfFirst,
      files.pdfSecond,
    );

    //await this.prismaService.pdfFile.create({
    // @TODO add the original two PDFs into the databse for visualizing the comparisons
    // url: newPdf.url,
    // });
  }

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
