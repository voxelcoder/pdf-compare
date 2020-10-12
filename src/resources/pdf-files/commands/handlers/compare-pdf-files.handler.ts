import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComparePdfFilesCommand } from '../impl/compare-pdf-files.command';
import { PdfCompareService } from '../../../../comparison/pdf-compare/pdf-compare.service';

@CommandHandler(ComparePdfFilesCommand)
export class ComparePdfFilesHandler
  implements ICommandHandler<ComparePdfFilesCommand> {
  constructor(private readonly pdfCompareService: PdfCompareService) {}

  async execute(command: ComparePdfFilesCommand): Promise<any> {
    await this.pdfCompareService.compare(
      command.firstPdfId,
      command.secondPdfId,
    );
  }
}
