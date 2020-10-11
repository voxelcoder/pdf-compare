import { Injectable } from '@nestjs/common';
import { Bucket, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStorageService extends Storage {
  constructor(private readonly configService: ConfigService) {
    super({
      credentials: {
        client_email: configService.get<string>('GOOGLE_STORAGE_CLIENT_EMAIL'),
        private_key: configService.get<string>('GOOGLE_STORAGE_PRIVATE_KEY'),
      },
      projectId: configService.get<string>('GOOGLE_STORAGE_PROJECT_ID'),
    });
  }

  getPdfCompareBucket(): Bucket {
    return this.bucket(
      this.configService.get<string>('GOOGLE_STORAGE_BUCKET_NAME'),
    );
  }
}
