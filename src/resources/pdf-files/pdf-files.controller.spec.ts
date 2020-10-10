import { Test, TestingModule } from '@nestjs/testing';
import { PdfFilesController } from './pdf-files.controller';

describe('PdfFilesController', () => {
  let controller: PdfFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfFilesController],
    }).compile();

    controller = module.get<PdfFilesController>(PdfFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
