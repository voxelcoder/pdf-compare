import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private connected = false;

  constructor(private readonly configService: ConfigService) {
    super({
      log:
        configService.get<string>('NODE_ENV') === 'production'
          ? ['info', 'warn']
          : ['info', 'warn', 'query'],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit(): Promise<void> {
    if (this.$isConnected()) {
      return;
    }

    this.logger.log('Connecting to the database ...');
    await this.$connect();
    this.logger.log('Successfully connected to the database');

    this.connected = true;
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.$isConnected()) {
      return;
    }

    this.logger.log('Disconnecting from the database ...');
    await this.$disconnect();
    this.logger.log('Successfully disconnected from the database');

    this.connected = false;
  }

  $isConnected(): boolean {
    return this.connected;
  }
}
