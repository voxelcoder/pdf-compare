import { Injectable } from '@nestjs/common';
import { PdfCompareService } from '../../comparison/pdf-compare/pdf-compare.service';
import { GoogleStorageService } from '../../google/google-storage/google-storage.service';
import { CommandBus } from '@nestjs/cqrs';
import { AuthenticatedUserType } from '../../prisma/services/user/types/authenticated-user.type';
import cuid from 'cuid';
import { format } from 'util';
import { PdfFileType, PdfFile } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { asyncForEach } from '../../common/functions/async-for-each.function';
import { ComparePdfFilesCommand } from './commands/impl/compare-pdf-files.command';

@Injectable()
export class PdfFilesService {
  constructor(
    private readonly googleStorageService: GoogleStorageService,
    private readonly pdfCompareService: PdfCompareService,
    private readonly prismaService: PrismaService,
    private readonly commandBus: CommandBus,
  ) {}

  async compareFiles(
    files: {
      pdfFirst: Express.Multer.File;
      pdfSecond: Express.Multer.File;
    },
    user: AuthenticatedUserType,
  ): Promise<PdfFile[]> {
    const pdfFiles = await this.uploadToGoogleCloudStorage(files, user);

    const firstPdfFile = pdfFiles.find(
      pdfFile => pdfFile.type === PdfFileType.FIRST,
    );

    const secondPdfFile = pdfFiles.find(
      pdfFile => pdfFile.type === PdfFileType.SECOND,
    );

    await this.commandBus.execute(
      new ComparePdfFilesCommand(firstPdfFile.id, secondPdfFile.id),
    );

    return pdfFiles;
  }

  private async uploadToGoogleCloudStorage(
    files: {
      pdfFirst: Express.Multer.File;
      pdfSecond: Express.Multer.File;
    },
    user: AuthenticatedUserType,
  ): Promise<PdfFile[]> {
    const bucket = this.googleStorageService.getPdfCompareBucket();
    const promises: Promise<PdfFile>[] = [];

    /*
     * In order to be able to work with Prisma and to
     * resolve successful uploads of PDF documents to our GCP Bucket manually,
     * we have to iterate over both of the pdf files asynchronously.
     */
    await asyncForEach(Object.keys(files), async (key, index) => {
      const pdfFile: Express.Multer.File | null = files[key] || null;

      const pdfFileId = cuid();

      const blob = bucket.file(`files/${pdfFileId}.pdf`);
      const blobStream = blob.createWriteStream();

      promises.push(
        // We wrap everything in a Promise because we have to await the 'finish' event of the blob stream.
        new Promise((resolve, reject) => {
          blobStream.on('error', error => reject(error));

          blobStream.on('finish', async () => {
            await blob.makePublic();

            /*
             * We call the format function in case there are URL-unfriendly
             * characters in either the bucket or blob name.
             */
            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
            );

            // Creates a database-entry for the PDF file we just uploaded.
            const pdfFile: PdfFile = await this.prismaService.pdfFile.create({
              data: {
                remotePath: blob.name,
                url: publicUrl,
                owner: { connect: { id: user.id } },
                type: index === 0 ? PdfFileType.FIRST : PdfFileType.SECOND,
              },
            });

            resolve(pdfFile);
          });

          blobStream.end(pdfFile.buffer);
        }),
      );
    });

    // We call Promise.all to ensure that we processed every PDF upload before continuing.
    return Promise.all(promises);
  }

  findAll(user: AuthenticatedUserType) {
    console.log({ user });
    return `This action returns all pdfFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdfFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdfFile`;
  }
}
