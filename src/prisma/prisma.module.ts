import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from './services/user/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, UserService],
  exports: [PrismaService, UserService],
})
export class PrismaModule {}
