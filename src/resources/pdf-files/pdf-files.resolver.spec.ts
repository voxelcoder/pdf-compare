import { Test, TestingModule } from '@nestjs/testing';
import { PdfFilesResolver } from './pdf-files.resolver';
import { PdfFilesService } from './pdf-files.service';

describe('PdfFilesResolver', () => {
  let resolver: PdfFilesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfFilesResolver, PdfFilesService],
    }).compile();

    resolver = module.get<PdfFilesResolver>(PdfFilesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
