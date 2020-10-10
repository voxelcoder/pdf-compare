import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CommonModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
