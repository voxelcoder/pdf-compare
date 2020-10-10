import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('pdf-files')
export class PdfFilesController {
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'pdfFirst', maxCount: 1 },
        { name: 'pdfSecond', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/',
          filename: (request, file, callback) => {
            const name = file.originalname.split('.')[0];
            const fileExtName = extname(file.originalname);
            const randomName = Array(4)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            callback(null, `${name}-${randomName}${fileExtName}`);
          },
        }),
      },
    ),
  )
  uploadFile(@UploadedFiles() files) {
    const pdfFirst = files.pdfFirst || null;
    const pdfSecond = files.pdfSecond || null;

    console.log({ pdfFirst, pdfSecond });

    // const newPdf = await this.pdfComparer.compare(pdfFirst, pdfSecond);
    //
    // this.prismaService.pdfFiles.create({
    //   url: newPdf.url,
    //   ...
    // })
  }
}
