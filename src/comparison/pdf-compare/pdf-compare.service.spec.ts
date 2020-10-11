import { Test, TestingModule } from '@nestjs/testing';
import { PdfCompareService } from './pdf-compare.service';

describe('PdfCompareService', () => {
  let service: PdfCompareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfCompareService],
    }).compile();

    service = module.get<PdfCompareService>(PdfCompareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
