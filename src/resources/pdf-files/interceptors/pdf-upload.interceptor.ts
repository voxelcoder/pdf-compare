import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { GoogleStorageService } from '../../../google/google-storage/google-storage.service';
import cuid from 'cuid';
import { format } from 'util';

@Injectable()
export class PdfUploadInterceptor implements NestInterceptor {
  constructor(private readonly googleStorageService: GoogleStorageService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    const { files } = request;

    const availableFileNames = ['pdfFirst', 'pdfSecond'];
    const bucket = this.googleStorageService.getPdfCompareBucket();

    availableFileNames.forEach(availableFileName => {
      const pdfFile: Express.Multer.File | null =
        files[availableFileName][0] || null;

      const pdfFileId = cuid();

      const blob = bucket.file(`files/${pdfFileId}.pdf`);
      const blobStream = blob.createWriteStream();

      blobStream.on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
        );

        console.log({ publicUrl });
      });

      blobStream.end(pdfFile.buffer);
    });

    return next.handle();
  }
}
