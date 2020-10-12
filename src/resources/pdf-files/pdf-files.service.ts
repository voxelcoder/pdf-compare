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

    // @TODO get both pfd files from bucket and compare (call the function in a queue)
    //this.commandBus.execute(new ComparePdfFilesCommand(firstPdfFile.id, secondPdfFile.id));

    return pdfFiles;
  }

  async uploadToGoogleCloudStorage(
    files: {
      pdfFirst: Express.Multer.File;
      pdfSecond: Express.Multer.File;
    },
    user: AuthenticatedUserType,
  ): Promise<PdfFile[]> {
    const bucket = this.googleStorageService.getPdfCompareBucket();
    const promises: Promise<PdfFile>[] = [];

    await asyncForEach(Object.keys(files), async (key, index) => {
      const pdfFile: Express.Multer.File | null = files[key] || null;

      const pdfFileId = cuid();

      const blob = bucket.file(`files/${pdfFileId}.pdf`);
      const blobStream = blob.createWriteStream();

      promises.push(
        new Promise((resolve, reject) => {
          blobStream.on('error', error => reject(error));

          blobStream.on('finish', async () => {
            await blob.makePublic();

            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
            );

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

    return await Promise.all(promises);
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
