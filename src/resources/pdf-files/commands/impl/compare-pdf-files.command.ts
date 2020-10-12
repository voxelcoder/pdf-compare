export class ComparePdfFilesCommand {
  constructor(
    public readonly firstPdfId: string,
    public readonly secondPdfId: string,
  ) {}
}
