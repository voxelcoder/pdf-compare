import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PdfFilesModule } from './pdf-files/pdf-files.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, PdfFilesModule],
})
export class ResourcesModule {}
